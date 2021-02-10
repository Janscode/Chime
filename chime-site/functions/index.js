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


//TODO: this is returning a warning `{"severity":"WARNING","message":"Function returned undefined, expected Promise or value"}`
exports.addQuestionToCampaign = functions.firestore.document('questions/{questionId}')
    .onCreate((snap, context) => {
        const questionId = context.params.questionId;
        const campaignId = snap.data().campaignId;
        const userRef = db.collection("users");

        const campaignRef = db.collection('campaigns');
        campaignRef.doc(campaignId).get()
            .then((doc) => {
                if (doc.exists) {
                    //Write question to user feeds
                    doc.data().recipients.forEach(uid => {
                        userRef.doc(uid).get().then((doc) => {
                            //TODO: am I doing this async right?
                            doc.ref.update({
                                queue: admin.firestore.FieldValue.arrayUnion(questionId),
                            });
                        });
                    });
                    // Write the question to the campaign list
                    return doc.ref.update({
                        questions: admin.firestore.FieldValue.arrayUnion(questionId),
                    })
                }
            });
    });

//TODO: this is returning a warning `{"severity":"WARNING","message":"Function returned undefined, expected Promise or value"}`
exports.updateQuestionName = functions.firestore.document('questions/{questionId}')
    .onCreate((snap, context) => {
        const campaignId = snap.data().campaignId;

        const campaignRef = db.collection('campaigns');
        campaignRef.doc(campaignId).get()
            .then((doc) => {
                if (doc.exists) {
                    // Write the question to the campaign list
                    return snap.ref.update({
                        author: doc.data().collabName,
                    })
                }
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
        
        db.collection("questions")
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
                } else {
                    return null;
                }
            })
            .catch((error) => {
                return functions.logger.log(error);
            })
    });
