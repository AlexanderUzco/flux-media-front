export type TUser = {
  id: string;
  username: string;
  email: string;
  role: 'ADMIN' | 'READER' | 'WRITER';
};
