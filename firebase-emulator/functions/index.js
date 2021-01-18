const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

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

        const campaignRef = db.collection('campaigns');
        campaignRef.doc(campaignId).get()
            .then((doc) => {
                if (doc.exists) {
                    // Write the question to the campaign list
                    return doc.ref.update({
                        questions: admin.firestore.FieldValue.arrayUnion(questionId),
                    })
                }
            });
    });

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

// TODO: Make a cloud function to represent a question queue