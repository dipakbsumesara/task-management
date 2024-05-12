import React from 'react';
import { Navigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from './constants';

const PublicRoutes = ({ element: Component, ...rest }: any) => {
  const isAuthenticated = () => {
    // Implement your authentication logic here, e.g., checking local storage or context
    return !!localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  };

  return isAuthenticated() ? (
    <Navigate to="/" replace />
  ) : (
    <Component {...rest} />
  );
};

export default PublicRoutes;
