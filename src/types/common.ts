export type TUser = {
  id: string;
  _id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'READER' | 'WRITER';
};
