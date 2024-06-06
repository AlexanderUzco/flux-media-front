import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';
import { useContext } from 'react';

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to='/signup'
      replace
    />
  );
};

export default PrivateRoute;
