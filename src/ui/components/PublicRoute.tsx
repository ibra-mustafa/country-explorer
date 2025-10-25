
import React from 'react';
import { Navigate } from 'react-router';
import { useAuthStore } from '../../core/store/authStore';

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useAuthStore(state => state.token);
  if (token) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default PublicRoute;
