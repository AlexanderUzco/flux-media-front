import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../screens/SignIn';
import Dashboard from '../screens/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '../components/Layout';
import SignUp from '../screens/SignUpp';
import Category from '../screens/Category';
import Topic from '../screens/Topic';
import ContentItem from '../screens/ContentItem';
import ContentItemDetail from '../screens/ContentItemDetail';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route
          path='/signup'
          element={<SignUp />}
        />
        <Route
          path='/signin'
          element={<SignIn />}
        />
        <Route
          path='/dashboard'
          element={<Dashboard />}
        />

        {/* Private route using PrivateRoute component */}

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
            path='/topic'
            element={<Topic />}
          />
          <Route
            path='/contentItem'
            element={<ContentItem />}
          />
          <Route
            path='/contentItem/:contentItemID' // Agrega la ruta con el parámetro itemID
            element={<ContentItemDetail />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
