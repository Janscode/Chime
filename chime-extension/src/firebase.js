//^ so that ESLint doesn't get upset
import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyC33QIMrxJ7K_jHIq1NMJr3Hcsw8KNNCn4",
    authDomain: "chime-dev-ff69d.firebaseapp.com",
    projectId: "chime-dev-ff69d",
    storageBucket: "chime-dev-ff69d.appspot.com",
    messagingSenderId: "949607484252",
    appId: "1:949607484252:web:75fcc8f8a6321745504f99",
    measurementId: "G-E364EHMM7R",
  });
const auth = app.auth();

auth.useEmulator('http://localhost:9099');

export { auth, firebase };
export default app;
