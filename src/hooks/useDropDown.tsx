import { useContext } from "react";
import MenuContext from "../contexts/MenuContext/MenuContext";

const useDropDown = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};

export default useDropDown;
