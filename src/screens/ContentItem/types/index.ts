import { TUser } from '../../../types/common';
import { TTopic } from '../../Topic/types';

type TItemText = {
  type: 'text';
  data: string;
};

type TItemVideo = {
  type: 'video';
  data: string[];
};

export type TImageData = {
  url: string;
  ref: string;
};

type TItemImage = {
  type: 'image';
  data: TImageData[];
};

export type TItemContent = TItemText | TItemVideo | TItemImage;

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
  content: TItemContent;
  createdBy: TUser;
  views: string[];
};

export type TContentItemSummary = {
  contentItems: number;
  images: number;
  videos: number;
  text: number;
};
