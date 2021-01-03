import {Alert, Button, Container, Form, Modal} from 'react-bootstrap';
import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {useAuth} from '../../../../contexts/AuthContext';
import {Link} from 'react-router-dom';

function Login(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {login} = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError('Username or password is incorrect');
    }
  }

  return (
    <Modal show={props.show} onHide={props.onClose}>
      <Modal.Header>
        Log In
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <Container className="text-center">
          {`Don't have an account?`} <Link to="/signup" onClick={props.onClose}>Sign Up</Link>
        </Container>
      </Modal.Footer>
    </Modal>
  );
}

Login.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Login;
