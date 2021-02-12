import * as firebaseui from 'firebaseui';
import { Card } from 'react-bootstrap';
import React, { useEffect } from 'react';
import 'firebaseui/dist/firebaseui.css';
import { useAuth } from '../../../../contexts/AuthContext';

function Login() {
  const { getAuth, getFAuth } = useAuth();
  const auth = getAuth();

  const firebaseuiConfig = ({
    signInSuccessUrl: '/campaigns/home',
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
    const firebaseuiDisplay = new firebaseui.auth.AuthUI(auth);
    firebaseuiDisplay.start('#firebaseui', firebaseuiConfig);
  }, []);
  return (
    <Card className="mx-3">
      <Card.Header>
        <h2 className="text-center">
        Log In/Sign Up
        </h2>
      </Card.Header>
      <Card.Body>
        <div id="firebaseui"/>
      </Card.Body>
    </Card>
  );
}


export default Login;
