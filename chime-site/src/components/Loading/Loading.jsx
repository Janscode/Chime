import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <Spinner
      animation="grow"
      variant="primary"
      style={{
        width: 50,
        height: 50,
        position: 'fixed',
        top: '40%',
        left: 'calc(50% - 25px)',
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};

export default Loading;
