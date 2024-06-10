import { TItemContent } from '../../../screens/ContentItem/types';

export type TSignupData = {
  username: string;
  email: string;
  password: string;
};

export type TSigninData = {
  email: string;
  password: string;
};

export type TVerifyUsername = {
  username: string;
};

export type TCreateCategory = {
  name: string;
  description: string;
  imageUrl: string;
  ref: string;
  createdBy: string;
};

export type TCreateTopic = {
  name: string;
  color: string;
  categoryID: string;
  allowContent: {
    text: boolean;
    image: boolean;
    video: boolean;
  };
  createdBy: string;
};

export type TCreateContentItem = {
  title: string;
  topicID: string;
  content: TItemContent | null;
  createdBy: string;
};

export type TCreateFileItem = {
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  ref: string;
  createdBy: string;
};

export type TFileElementCreated = TCreateFileItem & {
  _id: string;
};
