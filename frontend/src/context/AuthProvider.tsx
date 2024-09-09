import { useState } from 'react';  
import { mockUsers } from '../mock/mockUsers';  
import { AuthContextProps, AuthProviderProps, User } from '../models/interface';  
import { AuthContext } from '../hook/useAuth';  

export function AuthProvider({ children }: AuthProviderProps) {  
    const [user, setUser] = useState<User | null>(null);  

    const login = (token: string) => {  
        
        const validarUser: User | undefined = mockUsers.find((item) => token === item.password);  
        if (validarUser) {  
            setUser(validarUser); 
            return true;  
        }  
        return false; 
    }  

    const logout = () => {  
        setUser(null); 
    }  

    const isAuthenticated = () => {  
        return user !== null;
    }  

    const value: AuthContextProps = {  
        user,  
        login,  
        logout,  
        isAuthenticated  
    }  

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>  
}