import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }: any) => {
  const isAuthenticated = () => {
    // Implement your authentication logic here, e.g., checking local storage or context
    return !!localStorage.getItem('access-token');
  };

  return isAuthenticated() ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
