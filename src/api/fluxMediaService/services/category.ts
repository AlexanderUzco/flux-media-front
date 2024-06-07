import { API } from '../config';
import { TCreateCategory } from './types';

const getCategories = async () => API.get(`category`);

const createCategory = async (data: TCreateCategory) =>
  API.post(`category`, data);

const updateCategory = async (id: string, data: TCreateCategory) =>
  API.put(`category/${id}`, data);

const deleteCategory = async (id: string) => API.delete(`category/${id}`);

export { getCategories, createCategory, deleteCategory, updateCategory };
