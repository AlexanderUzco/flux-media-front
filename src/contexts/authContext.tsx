// AuthProvider.tsx
import { createContext, useEffect, useState, FC, ReactNode } from 'react';
import { TUser } from '../types/common';
import {
  authenticateUser,
  signin,
  signup,
} from '../api/fluxMediaService/services/user';
import { AxiosError } from 'axios';
import Loader from '../components/Loader';
import { removeCookie, setCookie } from 'typescript-cookie';
import {
  TSigninData,
  TSignupData,
} from '../api/fluxMediaService/services/types';
import { toast } from 'react-toastify';

const initialContext = {
  isAuthenticated: false,
  user: null,
  isPending: false,
  signupContext: () => {},
  signoutContext: () => {},
  signinContext: () => {},
};

interface IAuthContext {
  isAuthenticated: boolean;
  user: TUser | null;
  isPending: boolean;
  signinContext: (data: TSigninData) => void;
  signupContext: (data: TSignupData) => void;
  signoutContext: () => void;
}

export const AuthContext = createContext<IAuthContext>(initialContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<TUser | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);

  const fetchAuth = async () => {
    try {
      setIsPending(true);
      const res = await authenticateUser();

      if (res instanceof AxiosError) {
        throw { message: res?.response?.data };
      }

      setIsAuthenticated(true);

      setUser(res.data as TUser);
      setIsPending(false);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      setIsPending(false);
    }
  };

  const signinContext = async (data: TSigninData) => {
    try {
      setIsPending(true);
      const res = await signin(data);

      if (res instanceof AxiosError) {
        throw new Error(res.response?.data.message || 'Error in Signin');
      }

      setCookie('jwt', res.data.token);

      await fetchAuth();

      setIsPending(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Error in Signin');
      }

      setIsPending(false);
    }
  };

  const signupContext = async (data: TSignupData) => {
    try {
      setIsPending(true);
      const res = await signup(data);

      if (res instanceof AxiosError) {
        throw new Error(res.response?.data.message || 'Error in Signup');
      }

      setCookie('jwt', res.data.token);

      await fetchAuth();

      setIsPending(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Error in Signup');
      }

      setIsPending(false);
    }
  };

  const signoutContext = async () => {
    try {
      setIsPending(true);
      removeCookie('jwt');

      setIsAuthenticated(false);
      setUser(null);

      setIsPending(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Error in Signout');
      }

      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isPending,
        signupContext,
        signoutContext,
        signinContext,
      }}
    >
      {isPending && <Loader />}
      {children}
    </AuthContext.Provider>
  );
};
