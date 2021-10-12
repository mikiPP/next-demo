import React from 'react';
import PropTypes from 'prop-types';
import  useStorage from '../hooks/useStorage';
import { LOCAL_STORAGE } from '../utils/constants';

export const initialValue = {
  email: null,
  setEmail: () => {},
  removeEmail: () => {},
};

const AuthContext = React.createContext(initialValue);

export const AuthContextProvider = ({ children }) => {
  const [ email, setEmail, removeEmail ] = useStorage('email', '', LOCAL_STORAGE);

  return (
    <AuthContext.Provider
      value={{ email, setEmail, removeEmail }}
      >
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
