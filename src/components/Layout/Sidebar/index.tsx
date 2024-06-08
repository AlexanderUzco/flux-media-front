// src/components/Sidebar.tsx
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { AuthContext } from '../../../contexts/authContext';
import { useContext } from 'react';

const Sidebar = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <div className='md:block w-52 h-full bg-gray-800 text-white flex flex-col hidden'>
      <div className='p-2'>
        <img
          src={logo}
          alt='Logo'
          className='w-16 mx-auto'
        />
      </div>

      <nav className='flex-1 px-2 space-y-2'>
        <Link
          to='/'
          className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700'
        >
          Dashboard
        </Link>
        {isAuthenticated && user?.role === 'ADMIN' && (
          <>
            <Link
              to='/category'
              className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700'
            >
              Category
            </Link>

            <Link
              to='/topic'
              className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700'
            >
              Topic
            </Link>
          </>
        )}
        {(user?.role === 'ADMIN' || user?.role === 'WRITER') && (
          <Link
            to='/contentItem'
            className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700'
          >
            Content Media
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
