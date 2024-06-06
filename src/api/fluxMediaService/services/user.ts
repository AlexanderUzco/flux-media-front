import { removeCookie } from 'typescript-cookie';
import { API } from '../config';
import { TSigninData, TSignupData } from './types';

const signin = async (body: TSigninData) => API.post(`users/signin`, body);

const signup = async (body: TSignupData) => API.post(`users/signup`, body);

const signout = async () => {
  removeCookie('jwt');
  return API.post(`users/signout`);
};

const authenticateUser = async () => API.get(`users/authenticate`);

export { signin, signup, signout, authenticateUser };
