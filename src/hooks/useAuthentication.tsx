import { useContext } from "react";
import AuthContext from "../contexts/AuthContext/AuthContext";

const useAuthentication1 = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("error");
  }
  return context;
};

export default useAuthentication1;
