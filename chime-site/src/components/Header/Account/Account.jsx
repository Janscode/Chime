import {Button} from 'react-bootstrap';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Login from './Login/Login';

function Account(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={props.className}>
      <Button variant="secondary" onClick={handleShow}>
            Sign In
      </Button>

      <Login show={show} onClose={handleClose}/>
    </div>
  );
}

Account.propTypes = {
  className: PropTypes.string,
};

export default Account;
