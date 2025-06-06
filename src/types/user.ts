export interface IUser {
    id: string;
    email: string;
    password: string;
    role: 'USER' | 'ADMIN';
    createdAt?: Date;
  }
  