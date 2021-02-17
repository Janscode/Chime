const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// TODO: This is only a solution for local use.
app.use('/integrations', express.static('./node_modules/chime-components/dist/chime-components'));

admin.initializeApp();

const db = admin.firestore();

exports.integrations = functions.https.onRequest(app);

exports.createUser = functions.auth.user().onCreate((user) => {
    const { uid, displayName, email } = user;

    return admin.firestore()
        .collection('users')
        .doc(uid)
        .set({ uid, displayName, email });
});

exports.addQuestionToCampaign = functions.firestore.document('questions/{questionId}')
    .onCreate((snap, context) => {
        const questionId = context.params.questionId;
        const campaignId = snap.data().campaignId;
        const userRef = db.collection("users");

        const campaignRef = db.collection('campaigns');
        const updates = campaignRef.doc(campaignId).get()
            .then((campaignDoc) => {
                if (campaignDoc.exists) {

                    const recipientUidArray = campaignDoc.data().recipients;
                    const userDocs = recipientUidArray.map(uid => userRef.doc(uid).get());
                    const docRefs = [campaignDoc, ...userDocs];
                    return Promise.all(docRefs);
                } else {
                    return null;
                }
            })
            .then((docRefs) => {
                const campaignDoc = docRefs[0];
                const campaignUpdate = campaignDoc.ref.update({
                    questions: admin.firestore.FieldValue.arrayUnion(questionId),
                });
                // Take all but first element of docRefs
                const userUpdates = docRefs.slice(1).map(userDoc =>
                    userDoc.ref.update({
                        queue: admin.firestore.FieldValue.arrayUnion(questionId),
                    })
                );

                const updates = [campaignUpdate, ...userUpdates];
                return Promise.all(updates);
            })
            .catch((error) => {
                console.log(error);
            });
            return updates;
    });

exports.updateQuestionName = functions.firestore.document('questions/{questionId}')
    .onCreate((snap, context) => {
        const campaignId = snap.data().campaignId;

        const campaignRef = db.collection('campaigns');
        return campaignRef.doc(campaignId).get()
            .then((doc) => {
                if (doc.exists) {
                    // Write the question to the campaign list
                    return snap.ref.update({
                        author: doc.data().collabName,
                    })
                }
                else {
                    return null;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });

exports.removeQuestionFromQueue = functions.firestore.document('questions/{questionId}/responses/{uid}')
    .onWrite((change, context) => {
        const qid = context.params.questionId;
        const uid = context.params.uid;

        return db.collection("users")
            .doc(uid)
            .update({
                queue: admin.firestore.FieldValue.arrayRemove(qid),
            });
    });

exports.aggregateResponse = functions.firestore.document('questions/{questionId}/responses/{uid}')
    .onWrite((change, context) => {
        const qid = context.params.questionId;
        const uid = context.params.uid;
        
        return db.collection("questions")
            .doc(qid)
            .get()
            .then((doc) => {
                if (doc.data().type === 'Text Input') {
                    let responses;
                    if (doc.data.responses) {
                        responses = [change.after.data().data, ...doc.data().responses.slice(0, 4)];
                    } else {
                        responses = [change.after.data().data];
                    }
                    return db.collection("questions")
                        .doc(qid)
                        .update({
                            responses: responses,
                        });
                } else if (doc.data().type === 'Radio Buttons' || doc.data().type === 'Checkboxes') {
                    const choices = change.after.data().data
                    let responseObj = {
                        "totalResponses": admin.firestore.FieldValue.increment(1),
                    }

                    const keys = choices.map((choice) => {
                        return `responses.${choice}.votes`;
                    });

                    keys.forEach((key) => responseObj[key] = admin.firestore.FieldValue.increment(1));

                    return db.collection("questions")
                        .doc(qid)
                        .update({
                            ...responseObj
                        });
                } else {
                    return null;
                }
            })
            .catch((error) => {
                return functions.logger.log(error);
            })
    });
