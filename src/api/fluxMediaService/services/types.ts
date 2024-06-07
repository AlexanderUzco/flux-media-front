export type TSigninData = {
  username: string;
  email: string;
  password: string;
};

export type TSignupData = {
  email: string;
  password: string;
};

export type TCreateCategory = {
  name: string;
  description: string;
  imageUrl: string;
  ref: string;
  createdBy: string;
};
