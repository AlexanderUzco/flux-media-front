import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from '../screens/Signup';
import Dashboard from '../screens/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '../components/Layout';
import SignIn from '../screens/Signin';
import Category from '../screens/Category';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path='/signup'
        element={<Signup />}
      />
      <Route
        path='/signin'
        element={<SignIn />}
      />

      {/* Private route using PrivateRoute component */}
      <Route element={<Layout />}>
        <Route
          path='/'
          element={
            <Navigate
              to='/dashboard'
              replace
            />
          }
        />
        <Route
          path='/'
          element={<PrivateRoute />}
        >
          <Route
            path='/category'
            element={<Category />}
          />
          <Route
            path='/dashboard'
            element={<Dashboard />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
