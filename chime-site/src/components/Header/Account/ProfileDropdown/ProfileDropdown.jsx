import React from 'react';
import { Dropdown, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './ProfileDropdown.scss';
import { useAuth } from '../../../../contexts/AuthContext';

function ProfileDropdown() {
  const { signOut, currentUser } = useAuth();
  /* eslint-disable react/display-name */
  const UserProfile = React.forwardRef(({ children, onClick }, ref) =>
    (
      <Container
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </Container>
    ));

  UserProfile.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
  };
  return (
    <Dropdown>
      <Dropdown.Toggle as={UserProfile}>
        {/* TODO: Make this actually do something */}
        <span className="text-muted mr-3">220 responses today</span>
        <span className="profile-icon">{String(currentUser.email[0]).toUpperCase()}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Header>
          {currentUser.email}
        </Dropdown.Header>
        <Dropdown.Divider />
        <Dropdown.Item
          className="text-center"
          eventKey="1"
          onClick={signOut}
        >
          Sign Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ProfileDropdown;
