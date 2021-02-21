import { auth, db } from '../firebase';
import firebase from 'firebase';

const campaignsRef = db.collection('campaigns');
const usersRef = db.collection('users');
const questionsRef = db.collection('questions');

export function addCampaign(campaign) {
  return campaignsRef
      .add({
        active: true,
        ...campaign,
        lastModified: firebase.firestore.Timestamp.now(),
        question: [],
      });
}

export function addQuestionToCampaign(campaignId, question) {
  return questionsRef
      .add({
        active: true,
        author: '',
        campaignId: campaignId,
        lastModified: firebase.firestore.Timestamp.now(),
        prompt: question.prompt,
        type: question.type,
        choices: question.choices,
      });
}

export function getCampaignById(id) {
  return campaignsRef
      .doc(id)
      .get();
}

export function getCampaignsForCurrUser() {
  return campaignsRef
      .where('collaborators', 'array-contains', auth.currentUser.uid)
      .get();
}

export function getCampaignQuestions(campaignId) {
  return questionsRef
      .where('campaignId', '==', campaignId)
      .get();
}

export function getQuestionById(qid) {
  return questionsRef
      .doc(qid)
      .get();
}

export function getUserByEmail(email) {
  return usersRef
      .where('email', '==', email)
      .limit(1)
      .get();
}

export function getUserById(id) {
  return usersRef
      .where('uid', '==', id)
      .limit(1)
      .get();
}

export function updateQuestion(qid, question) {
  return questionsRef
      .doc(qid)
      .update({
        ...question,
      });
}
