import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { useAuth } from '../../../../contexts/AuthContext';
import Login from '../Login/Login';
import { useHistory } from 'react-router-dom';

function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const history = useHistory();

  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !==
      passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  }

  return (
    <>
      <Card className="mx-3">
        <Card.Header>
          <h2 className="text-center">
            Sign Up
          </h2>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger"> {error} </Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="passwordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
            </Form.Group>
            <Button className="w-100" type="submit" disabled={loading}>Sign Up</Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-center">
          Already have an account? <Button variant="link" onClick={handleShow}> Log In </Button>
        </Card.Footer>
      </Card>
      <Login show={show} onClose={handleClose} />
    </>
  );
}

export default SignUp;
