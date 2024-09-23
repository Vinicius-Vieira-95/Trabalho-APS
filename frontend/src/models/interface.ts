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
    login: (email: string,password: string) => boolean;
    logout: () => void;
    token: string | null; 
}



export interface AuthProviderProps {
    children: React.ReactNode;
}
