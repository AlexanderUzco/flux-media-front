import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/16/solid';
import { UserCircleIcon } from '@heroicons/react/16/solid';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@contexts/authContext';
import logo from '@assets/logo.png';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/16/solid';
import Tag from '@components/Tag';

const Navbar = () => {
  // Auth context
  const { isAuthenticated, signoutContext, user } = useContext(AuthContext);
  const navigator = useNavigate();

  const handleLogout = async () => signoutContext();

  const handleSignin = () => navigator('/signin');

  const handleDasoboard = () => navigator('/');

  return (
    <div className='w-full bg-gray-900 text-white p-4 flex justify-between items-center'>
      <div className='flex items-center'>
        <h1
          className='text-xl font-bold hidden md:block cursor-pointer mr-2'
          onClick={handleDasoboard}
        >
          Flux Media
        </h1>
        {user && user.role === 'ADMIN' && (
          <Tag
            text='Admin'
            color='#00ff6e'
            transparent
            className='hidden md:block'
          />
        )}
      </div>

      <img
        src={logo}
        alt='Logo'
        className='w-12 md:mx-auto md:hidden cursor-pointer'
        onClick={handleDasoboard}
      />
      <div>
        {isAuthenticated ? (
          <ArrowLeftStartOnRectangleIcon
            className='hidden md:block h-6 w-6 cursor-pointer hover:text-gray-400 transition duration-200'
            onClick={handleLogout}
          />
        ) : (
          <UserCircleIcon
            className='hidden md:block h-6 w-6 cursor-pointer hover:text-gray-400 transition duration-200'
            onClick={handleSignin}
          />
        )}

        <Menu>
          <MenuButton className={'md:hidden block z-[100]'}>
            <AdjustmentsHorizontalIcon className='h-6 w-6' />
          </MenuButton>
          <MenuItems
            anchor='bottom'
            className={
              'bg-white text-gray-900 w-32 mt-2 rounded shadow-lg z-[100]'
            }
          >
            {user && user.role === 'ADMIN' && (
              <div className='w-full flex item-center my-2'>
                <Tag
                  text='Admin'
                  color='#00ff6e'
                  transparent
                  className='m-auto'
                />
              </div>
            )}
            <MenuItem>
              <Link
                to='/'
                className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 w-full text-left'
              >
                Dashboard
              </Link>
            </MenuItem>

            {isAuthenticated && user?.role === 'ADMIN' && (
              <>
                <MenuItem>
                  <Link
                    to='/category'
                    className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 w-full text-left'
                  >
                    Category
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to='/topic'
                    className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 w-full text-left'
                  >
                    Topic
                  </Link>
                </MenuItem>
              </>
            )}

            {(user?.role === 'ADMIN' || user?.role === 'WRITER') && (
              <MenuItem>
                <Link
                  to='/contentItem'
                  className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 w-full text-left'
                >
                  Content Media
                </Link>
              </MenuItem>
            )}

            {/* Create signout button */}
            <MenuItem>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 w-full text-left'
                >
                  Sign out
                </button>
              ) : (
                <button
                  onClick={handleSignin}
                  className='block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-100 w-full text-left'
                >
                  Sign In
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
