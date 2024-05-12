import React from 'react';
import { Navigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from './constants';

const ProtectedRoute = ({ element: Component, ...rest }: any) => {
  const isAuthenticated = () => {
    // Implement your authentication logic here, e.g., checking local storage or context
    return !!localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  };

  return isAuthenticated() ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
