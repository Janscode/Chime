import { Card } from 'react-bootstrap';
import React from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import { Redirect } from 'react-router-dom';

function VerifyEmail() {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Redirect to='/login' />;
  }
  if (currentUser.emailIsVerified) {
    return <Redirect to='/campaign' />;
  }

  return (
    <Card className="mx-3">
      <Card.Header>
        <h2 className="text-center">
        Hi {currentUser.displayName}! Please confirm your email.
        </h2>
      </Card.Header>
      <Card.Body>
        A link to confirm your registration has been sent to: { currentUser.email }
        <br/>
        <a href='/campaigns/home'>Please click here after verifying your email.</a>
      </Card.Body>
    </Card>
  );
}


export default VerifyEmail;
