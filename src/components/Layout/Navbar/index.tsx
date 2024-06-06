import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/16/solid';
import { UserCircleIcon } from '@heroicons/react/16/solid';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/authContext';
import logo from '../../../assets/logo.png';
const Navbar = () => {
  // Auth context
  const { isAuthenticated, signoutContext } = useContext(AuthContext);

  const handleLogout = async () => signoutContext();

  return (
    <div className='w-full bg-gray-900 text-white p-4 flex justify-between items-center'>
      <div className='flex'>
        {!isAuthenticated && (
          <img
            src={logo}
            alt='Logo'
            className='w-12 md:mx-auto md:hidden'
          />
        )}
        <h1 className='text-xl font-bold hidden md:block'>Flux Media</h1>
      </div>

      <img
        src={logo}
        alt='Logo'
        className='w-12 md:mx-auto md:hidden'
      />
      <div>
        {isAuthenticated ? (
          <ArrowLeftStartOnRectangleIcon
            className='hidden md:block h-6 w-6 cursor-pointer hover:text-gray-400 transition duration-200'
            onClick={handleLogout}
          />
        ) : (
          <UserCircleIcon className='hidden md:block h-6 w-6 cursor-pointer hover:text-gray-400 transition duration-200' />
        )}

        <Menu>
          <MenuButton className={'md:hidden block'}>Options</MenuButton>
          <MenuItems
            anchor='bottom'
            className={'bg-white text-gray-900 w-32 mt-2 rounded shadow-lg'}
          >
            <MenuItem>
              <Link
                to='/'
                className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 w-full text-left'
              >
                Dashboard
              </Link>
            </MenuItem>
            {/* Create signout button */}
            <MenuItem>
              <button
                onClick={handleLogout}
                className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 w-full text-left'
              >
                Sign out
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
