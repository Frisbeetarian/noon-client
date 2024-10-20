import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getLoggedInUser } from '../store/users';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const loggedInUser = useSelector(getLoggedInUser);

  if (!loggedInUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
