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
