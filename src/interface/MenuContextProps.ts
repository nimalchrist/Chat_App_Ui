export interface MenuItem {
  label: string;
  onClick: () => void;
}

interface MenuContextProps {
  anchorEl: HTMLElement | null;
  openMenu: (
    event: React.MouseEvent<HTMLElement>,
    menuItems: MenuItem[]
  ) => void;
  closeMenu: () => void;
  menuItems: MenuItem[];
}

export default MenuContextProps;
