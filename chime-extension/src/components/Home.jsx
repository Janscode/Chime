import React, { useEffect } from 'react'
import { Alert, Card } from 'react-bootstrap';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const { currentUser, getAuth, getFAuth } = useAuth();
  const firebaseuiConfig = ({
    signInFlow: 'popup',

    signInOptions: [
      getFAuth().EmailAuthProvider.PROVIDER_ID,
      getFAuth().GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        if (authResult.additionalUserInfo.isNewUser) {
          authResult.user.sendEmailVerification();
        }
        return true;
      },
    },
  });

  useEffect(() => {
    if(!currentUser) {
      const firebaseuiDisplay = new firebaseui.auth.AuthUI(getAuth());
      firebaseuiDisplay.start('#firebaseui', firebaseuiConfig)
    }
  }, []);

  return (
    <Card className="m-2">
      {currentUser ?
        <Card.Body>
          <Alert variant="success">You are signed in!</Alert>
        </Card.Body> :
        <>
          <Card.Header>
            Log In
          </Card.Header>
          <Card.Body>
            <div id="firebaseui"/>
          </Card.Body>
        </>
      }
    </Card>
  )
}

export default Home
