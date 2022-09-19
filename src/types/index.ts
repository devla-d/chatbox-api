export interface AuthUser {
  id: number;
  role: "user" | "admin" | "super_admin";
  username: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface RegisterType {
  username?: string;
  email?: string;
  password?: string;
}

export interface UserModel {
  id: number;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  roles: "user" | "admin" | "super_admin";
  online: boolean;
  image?: string;
  friends?: Array<number>;
}

export interface AuthtokenModel {}
