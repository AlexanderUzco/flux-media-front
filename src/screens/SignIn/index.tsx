import { useForm, SubmitHandler } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { Link, useNavigate } from 'react-router-dom';

type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const { signinContext, isPending, isAuthenticated } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => signinContext(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='flex justify-center items-center h-full bg-gray-300'>
      <div className='w-full max-w-md p-8 rounded bg-white rounded'>
        <h1 className='text-3xl font-bold mb-4 text-center'>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className='mb-6'>
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
              to='/signup'
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

export default SignIn;
