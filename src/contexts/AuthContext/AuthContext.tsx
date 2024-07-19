import { createContext } from "react";
import AuthContextProps from "../../interface/AuthContextProps";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export default AuthContext;
