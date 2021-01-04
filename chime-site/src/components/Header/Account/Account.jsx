import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Login from './Login/Login';
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';
import { useAuth } from '../../../contexts/AuthContext';

function Account(props) {
  const [show, setShow] = useState(false);
  const { currentUser } = useAuth();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={props.className}>
      {currentUser ?
        <ProfileDropdown /> :
        <Button variant="primary" onClick={handleShow}> Sign In </Button>
      }

      <Login show={show} onClose={handleClose} />
    </div>
  );
}

Account.propTypes = {
  className: PropTypes.string,
};

export default Account;
