import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import PropTypes from 'prop-types';
import firebase from 'firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signOut() {
    return auth.signOut();
  }

  function getAuth() {
    return auth;
  }

  function getFAuth() {
    return firebase.auth;
  }

  function getJWT() {
    return auth.currentUser?.getIdToken();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    getAuth,
    getFAuth,
    getJWT,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
