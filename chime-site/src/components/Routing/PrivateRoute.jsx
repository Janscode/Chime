import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../contexts/AuthContext';

const PrivateRoute = ({ component: Component, redirectTo, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={() => (
          currentUser ?
          <Component /> :
          <Redirect to={redirectTo} />
      )}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default PrivateRoute;
