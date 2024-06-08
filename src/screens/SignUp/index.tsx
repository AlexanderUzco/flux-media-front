import { useForm, SubmitHandler } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { useNavigate, Link } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce';
import { verifyUsername } from '../../api/fluxMediaService/services/user';
import { AxiosError } from 'axios';

type Inputs = {
  username: string;
  email: string;
  password: string;
  role: string;
};

const SignUp = () => {
  const { signupContext, isPending, isAuthenticated } = useContext(AuthContext);

  const [errorExistUsername, setErrorExistUsername] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const usernameValue = watch('username');

  const debouncedUsername = useDebounce(usernameValue, 500);

  const onSubmit: SubmitHandler<Inputs> = async (data) => signupContext(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const checkUsernameAvailability = async () => {
      try {
        const res = await verifyUsername({ username: debouncedUsername });

        if (res instanceof AxiosError) {
          throw new Error(
            res.response?.data.message || 'Error in Verify Username'
          );
        }

        const { exists } = res.data;

        setErrorExistUsername(exists);
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        }
      }
    };

    if (debouncedUsername) {
      checkUsernameAvailability();
    }
  }, [debouncedUsername]);

  return (
    <div className='flex justify-center items-center h-full bg-gray-300'>
      <div className='w-full max-w-md p-8 rounded bg-white rounded'>
        <h1 className='text-3xl font-bold mb-4 text-center'>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Username
            </label>
            <input
              type='text'
              id='username'
              {...register('username', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            {errors.username && (
              <span className='text-red-500'>This field is required</span>
            )}
            {errorExistUsername && (
              <span className='text-red-500'>Username already taken</span>
            )}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              {...register('email', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            {errors.email && (
              <span className='text-red-500'>This field is required</span>
            )}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              {...register('password', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            />
            {errors.password && (
              <span className='text-red-500'>This field is required</span>
            )}
          </div>
          {/* Nuevo select para el tipo de registro */}
          <div className='mb-6'>
            <label
              htmlFor='role' // Cambiado a "role"
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              User Type
            </label>
            <select
              id='role' // Cambiado a "role"
              {...register('role', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            >
              <option value='WRITER'>Writer</option>{' '}
              <option value='READER'>Reader</option>{' '}
            </select>
            {errors.role && (
              <span className='text-red-500'>This field is required</span>
            )}
          </div>
          <div className='flex items-center justify-center'>
            <button
              type='submit'
              className={`hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isPending ? 'cursor-not-allowed bg-blue-500' : 'bg-blue-500'
              }`}
              disabled={isPending}
            >
              Sign In
            </button>
          </div>
          <p className='mt-4 text-sm text-center'>
            Don't have an account?{' '}
            <Link
              to='/signin'
              className='text-blue-500'
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
