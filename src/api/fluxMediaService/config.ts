import axios, { AxiosError } from 'axios';
import { getCookie } from 'typescript-cookie';
import { VITE_FLUX_MEDIA_SERVICE_URL } from '../../enviroments/api';

//TODO: Put the correct base url to fetching data and
// set the diferents environments.

const getBaseUrl = (): string => {
  return `${VITE_FLUX_MEDIA_SERVICE_URL}`;
};

const API = axios.create({
  baseURL: getBaseUrl(),
});

API.interceptors.request.use((req) => {
  /**
   * TODO: Set the authorization when is available.
   */

  const token = getCookie('jwt');

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

API.interceptors.response.use(
  (res) => {
    // TODO: Delete this code only for development
    // console.log('service: Flux Media');
    // console.group(res.config.url);
    // console.log('method:', res.config.method);
    // console.log('body:', res.config.data && JSON.parse(res.config.data));
    // console.log('response:', res.data);
    // console.groupEnd();
    return res;
  },
  (err: AxiosError<Error>) => err
);

export { API, getBaseUrl };
