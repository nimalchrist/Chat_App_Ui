import { createContext } from "react";
import ThemeContextProps from "../../interface/ThemeContextProps";

const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);
export default ThemeContext;
