export enum Role {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
}

export type User = {
  id: string;
  name: string;
  type: Role;
  email: string;
  registration: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export interface AuthContextProps {
  isAuthenticated: () => boolean;
  user: User | null;
  login: (password: string) => boolean;
  logout: () => void;
  token: string | null;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
