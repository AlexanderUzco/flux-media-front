import { TTopic } from '../../Topic/types';

export type TItemFile = {
  _id: string;
  name: string;
  type: string;
  url: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type TItem = {
  _id: string;
  title: string;
  topicID: TTopic;
  content: {
    text: string;
    videos: string[];
    images: TItemFile[];
  };
  createdBy: string;
  views: string[];
};
