import { API } from '../config';
import { TCreateContentItem } from './types';

const getContentItems = async () => API.get(`contentItem`);

const getContentItemsByUser = async (userID: string) =>
  API.get(`contentItem/get-by-user/${userID}`);

const getContentItem = async (contentItemID: string) =>
  API.get(`contentItem/${contentItemID}`);

const createContentItem = async (data: TCreateContentItem) =>
  API.post(`contentItem`, data);

const deleteContentItem = async (contentItemID: string) =>
  API.delete(`contentItem/${contentItemID}`);

const getContentSummary = async () =>
  API.get(`contentItem/total-items-summary`);

const updateContentItem = async (
  contentItemID: string,
  data: TCreateContentItem
) => API.put(`contentItem/${contentItemID}`, data);

export {
  getContentItems,
  createContentItem,
  getContentItem,
  deleteContentItem,
  getContentItemsByUser,
  getContentSummary,
  updateContentItem,
};
