import { useContext, createContext } from "react";
import { AuthContextProps } from "../models/interface";

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => useContext(AuthContext)