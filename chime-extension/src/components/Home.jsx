import React, { useRef, useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { currentUser, login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
    } catch {
      setError('Username or password is incorrect');
    }
  }

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
              <Button className="w-100" type="submit" disabled={loading}>Log In</Button>
            </Form>
          </Card.Body>
          <Card.Footer>
            <Container className="text-center">
              {`Don't have an account? Visit our site to sign up.`}
            </Container>
          </Card.Footer>
        </>
      }
    </Card>
  )
}

export default Home
