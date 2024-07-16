import { Menu, MenuItem } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { MenuItem as MenuItemType } from "../../interface/MenuContextProps";
import MenuContext from "./MenuContext";

const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);

  const openMenu = (
    event: React.MouseEvent<HTMLElement>,
    items: MenuItemType[]
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuItems(items);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <MenuContext.Provider value={{ anchorEl, openMenu, closeMenu, menuItems }}>
      {children}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.onClick();
              closeMenu();
            }}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </MenuContext.Provider>
  );
};

export default MenuProvider;
