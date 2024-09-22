import { useState } from 'react';  
import { mockUsers } from '../mock/mockUsers';  
import { AuthContextProps, AuthProviderProps, User } from '../models/interface';  
import { AuthContext } from '../hook/useAuth';  

export function AuthProvider({ children }: AuthProviderProps) {  
    const [user, setUser] = useState<User | null>(null);  
    const [token, setToken] = useState<string | null>(null); 


    const login = (inputToken: string) => {  
        const validarUser: User | undefined = mockUsers.find((item) => inputToken === item.password);  
        if (validarUser) {  
            setUser(validarUser);  
            setToken(inputToken); 
            return true;  
        }  
        return false; 
    }  

    const logout = () => {  
        setUser(null);  
        setToken(null); 
    }  

    const isAuthenticated = () => {  
        return user !== null;
    }  

    const value: AuthContextProps = {  
        user,  
        token,
        login,  
        logout,  
        isAuthenticated  
    }  

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>  
}
