import React, { useContext } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import Spinner from './Spinner';

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, isPending } = useContext(AuthContext);
  const location = useLocation();

  if (isPending) return <Spinner />;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to='/signup'
      replace
      state={{ from: location }}
    />
  );
};

export default PrivateRoute;
