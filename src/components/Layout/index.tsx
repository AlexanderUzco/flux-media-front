// src/components/Layout.tsx
import { useContext } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';

const Layout = () => {
  // AuthContext

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className='flex h-screen bg-grey-200'>
      {isAuthenticated && <Sidebar />}
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Navbar />
        <main className='flex-1 overflow-y-auto bg-grey-100 relative'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
