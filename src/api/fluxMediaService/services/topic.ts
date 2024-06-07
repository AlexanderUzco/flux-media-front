import { API } from '../config';
import { TCreateTopic } from './types';

const getTopics = async () => API.get(`topic`);

const createTopic = async (data: TCreateTopic) => API.post(`topic`, data);

const editTopic = async (id: string, data: TCreateTopic) =>
  API.put(`topic/${id}`, data);

const deleteTopic = async (id: string) => API.delete(`topic/${id}`);

export { getTopics, createTopic, deleteTopic, editTopic };
