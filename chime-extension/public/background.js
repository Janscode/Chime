// import firebase from 'firebase';

var app = firebase.initializeApp({
  apiKey: "AIzaSyC33QIMrxJ7K_jHIq1NMJr3Hcsw8KNNCn4",
  authDomain: "chime-dev-ff69d.firebaseapp.com",
  projectId: "chime-dev-ff69d",
  storageBucket: "chime-dev-ff69d.appspot.com",
  messagingSenderId: "949607484252",
  appId: "1:949607484252:web:75fcc8f8a6321745504f99",
  measurementId: "G-E364EHMM7R",
});

var db = app.firestore();
var auth = app.auth();
var queue;
var currentUser;

// TODO: change this in prod
if (true) {
  console.log('Connecting to emulated db...');
  db.useEmulator('localhost', 8080);
  auth.useEmulator('http://localhost:9099');
}

function getQuestion() {
  if (queue.length) {
    const q = queue[0]
    db.collection("questions").doc(q)
      .get()
      .then(integrate);
  }
}

function integrate(question) {
  if (question.exists) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        integration: "chime-universal",
        question: question.data(),
      })
    })
  }
}

function sendResponse(response) {
  if (queue.length && currentUser.uid) {
    const q = queue[0];
    db.collection("questions")
      .doc(q)
      .collection("responses")
      .doc(currentUser.uid)
      .set({
        data: response.data,
      })
  }
}

let unsubscribe = () => {};
auth.onAuthStateChanged((user) => {
  currentUser = user;
  if (user) {
    unsubscribe = db.collection("users").doc(user.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          queue = doc.get('queue');
        } else {
          console.error('User doc doesn\'t exist');
        }
      }, (error) => {
        console.error(error);
      })
  } else {
    unsubscribe();
    unsubscribe = () => {};
  }
});

// Receive responses
chrome.runtime.onMessage.addListener((request, sender, response) => {
  if (request.type === 'submit') {
    sendResponse(request);
  } else if (request.type === 'mount') {
    // we can get the url from the request and then preform more intelligent deployment
    getQuestion();
  } else {
    console.log('Dismissed');
  }

  response({received: true});
})