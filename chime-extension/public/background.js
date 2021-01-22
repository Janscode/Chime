const app = firebase.initializeApp({
  apiKey: "AIzaSyC33QIMrxJ7K_jHIq1NMJr3Hcsw8KNNCn4",
  authDomain: "chime-dev-ff69d.firebaseapp.com",
  projectId: "chime-dev-ff69d",
  storageBucket: "chime-dev-ff69d.appspot.com",
  messagingSenderId: "949607484252",
  appId: "1:949607484252:web:75fcc8f8a6321745504f99",
  measurementId: "G-E364EHMM7R",
});

const db = app.firestore();
// TODO: change this in prod
if (true) {
  console.log('Connecting to emulated db...');
  db.useEmulator('localhost', 8080);
}