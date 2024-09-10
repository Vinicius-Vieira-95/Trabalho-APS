import { useContext, createContext } from "react";
import { AuthContextProps } from "../models/interface";

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)