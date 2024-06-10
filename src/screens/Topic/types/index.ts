import { TUser } from '../../../types/common';
import { TCategory } from '../../Category/types';

export type TAllotment = {
  text: boolean;
  image: boolean;
  video: boolean;
};

export type TTopic = {
  _id: string;
  name: string;
  color: string;
  categoryID: TCategory;
  allowContent: TAllotment;
  createdBy: TUser;
};

export type TTopicByCategory = {
  category: string;
  topics: TTopic[];
};
