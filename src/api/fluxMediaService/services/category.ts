import { API } from '../config';
import { TCreateCategory } from './types';

const getCategories = async () => API.get(`category`);

const createCategory = async (data: TCreateCategory) =>
  API.post(`category`, data);

export { getCategories, createCategory };
