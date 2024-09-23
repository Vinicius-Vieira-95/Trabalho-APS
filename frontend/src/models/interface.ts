export interface User {
  id?: string;
  name?: string;
  email?: string;
  password: string;
  type: number;
}

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
