import React from 'react';
import { Container } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container
      className="d-flex flex-column align-items-center"
      fluid
    >
      <img
        className="mt-5 mb-3"
        src={'./404.svg'}
      />
      <span style={{
        textAlign: 'center',
      }}>
          Oops, something broke! <br />
          It looks like the page you’re looking for doesn’t exist :(
      </span>
    </Container>
  );
};

export default NotFound;
