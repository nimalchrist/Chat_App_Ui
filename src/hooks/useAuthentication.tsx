import { useContext } from "react";
import AuthContext from "../contexts/AuthContext/AuthContext";

// custom hook to simplify the access of AuthContext provider component
const useAuthentication = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("error");
  }
  return context;
};

export default useAuthentication;
