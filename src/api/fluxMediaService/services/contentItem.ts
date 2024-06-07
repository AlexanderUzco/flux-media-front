import { API } from '../config';
import { TCreateContentItem } from './types';

const getContentItems = async () => API.get(`contentItem`);

const getContentItem = async (contentItemID: string) =>
  API.get(`contentItem/${contentItemID}`);

const createContentItem = async (data: TCreateContentItem) =>
  API.post(`contentItem`, data);

const deleteContentItem = async (contentItemID: string) =>
  API.delete(`contentItem/${contentItemID}`);

export {
  getContentItems,
  createContentItem,
  getContentItem,
  deleteContentItem,
};
