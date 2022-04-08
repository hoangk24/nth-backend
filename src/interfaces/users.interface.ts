export interface User {
  _id: string;
  email: string;
  password: string;
  fullName: string;
  role: Role;
  avatar: string;
}

export enum Role {
  'ADMIN' = 1,
  'USER' = 2,
  'GUEST' = 3,
}
