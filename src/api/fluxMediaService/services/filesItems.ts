import { API } from '../config';
import { TCreateFileItem } from './types';

const createFileItem = async (data: TCreateFileItem) =>
  API.post(`filesItems`, data);

const createFileItems = async (data: TCreateFileItem[]) =>
  API.post(`filesItems/create-files`, data);

export { createFileItem, createFileItems };
