export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
}

export interface AuthForm {
  email: string;
  password: string;
  name?: string;
}
