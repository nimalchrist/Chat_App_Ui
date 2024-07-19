import { createContext } from "react";
import SnackBarContextProps from "../../interface/SnackBarContextProps";

const SnackBarContext = createContext<SnackBarContextProps | undefined>(
  undefined
);

export default SnackBarContext;