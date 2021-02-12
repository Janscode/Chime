import { Button } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';
import { useAuth } from '../../../contexts/AuthContext';

function Account(props) {
  const { currentUser } = useAuth();

  return (
    <div className={props.className}>
      {currentUser ?
        <ProfileDropdown /> :
        <Button as={Link} to="/login" variant="primary"> Sign In </Button>
      }

    </div>
  );
}

Account.propTypes = {
  className: PropTypes.string,
};

export default Account;
