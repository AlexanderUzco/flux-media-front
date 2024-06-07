import { TUser } from '../../../types/common';

export type TCategory = {
  _id: string;
  name: string;
  imageUrl: string;
  ref: string;
  description: string;
  createdBy: TUser;
};
