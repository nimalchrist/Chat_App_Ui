import { createContext } from "react";
import MenuContextProps from "../../interface/MenuContextProps";

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export default MenuContext;
