import { createContext } from "react";
import AuthContextType from "../../interface/AuthContextType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
