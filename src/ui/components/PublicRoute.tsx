import React from 'react';
import { Navigate } from 'react-router';

function getToken() {
  return document.cookie.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1] || '';
}

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = getToken();
  if (token) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default PublicRoute;
