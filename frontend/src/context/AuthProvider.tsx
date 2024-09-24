import { useState, useEffect } from 'react';  
import { mockUsers } from '../mock/mockUsers';  
import { AuthContextProps, AuthProviderProps, User } from '../models/interface';  
import { AuthContext } from '../hook/useAuth';  

export function AuthProvider({ children }: AuthProviderProps) {  
    const [user, setUser] = useState<User | null>(null);  
    const [token, setToken] = useState<string | null>(null);  

  const login = (inputToken: string) => {
    const validarUser: User | undefined = mockUsers.find(
      (item) => inputToken === item.password
    );

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser)); 
            setToken(storedToken);  
        }
    }, []);

    const login = (email: string, password: string) => {  
        const validarUser: User | undefined = mockUsers.find((item) => email === item.email && password === item.password);  
        if (validarUser) {  
            setUser(validarUser);  
            setToken(password); 
            localStorage.setItem('user', JSON.stringify(validarUser));
            localStorage.setItem('token', password);  
            return true;  
        }  
        return false; 
    }  

    const logout = () => {  
        setUser(null);  
        setToken(null);  
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }  

  const isAuthenticated = () => {
    return user !== null;
  };

  const value: AuthContextProps = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
  };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;  
}
