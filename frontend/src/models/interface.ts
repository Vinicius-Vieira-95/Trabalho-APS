export interface User {
    id?: number;
    name?:string;
    email?: string
    password: string;
    type: number
}

export interface AuthContextProps {
    isAuthenticated: () => boolean;
    user: User | null;
    login: (password: string) => boolean;
    logout: () => void;
}


export interface AuthProviderProps {
    children: React.ReactNode;
}
