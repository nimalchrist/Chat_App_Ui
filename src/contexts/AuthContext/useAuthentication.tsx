import { useContext } from "react";
import AuthContext from "./AuthContext";

const useAuthentication = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("error");
  }
  return context;
};

export default useAuthentication;
