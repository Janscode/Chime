import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ component: Component, redirectTo, children, ...rest }) => {
  const { currentUser } = useAuth();
  const checkRoute = () => {
    if (currentUser) {
      if (currentUser.emailVerified) {
        return (
          <Component>
            { children }
          </Component>
        );
      }
      return <Redirect to={'/verifyEmail'} />;
    }
    return <Redirect to={redirectTo} />;
  };
  return (
    <Route
      {...rest}
      render={checkRoute}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default PrivateRoute;
