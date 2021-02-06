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

// TODO: change this in prod
if (true) {
  console.log('Connecting to emulated db...');
  db.useEmulator('localhost', 8080);
  auth.useEmulator('http://localhost:9099');
}


function integrate(question) {
  if (question.exists) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      console.log(question.data());
      chrome.tabs.sendMessage(tabs[0].id, {
        author: question.data().author,
        integration: "chime-universal",
        question: question.data().text,
        type: question.data().type,
      })
    })
  }
}

function getQuestion() {
  if (queue.length) {
    const q = queue[0]
    db.collection("questions").doc(q)
      .get()
      .then(integrate);
  }
}

let unsubscribe = () => {};
auth.onAuthStateChanged((user) => {
  if (user) {
    unsubscribe = db.collection("users").doc(user.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          queue = doc.get('queue');
          setTimeout(getQuestion, 5000);
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
    console.log(`Submitted value ${request.data}`);
  } else {
    console.log('Dismissed');
  }

  response({received: true});
})