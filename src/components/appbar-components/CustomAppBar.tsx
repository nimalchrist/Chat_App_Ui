import { AccountCircle } from "@mui/icons-material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography
} from "@mui/material";
import React from "react";
import useAuthentication from "../../hooks/useAuthentication";
import useDropDown from "../../hooks/useDropDown";
import useThemeToggle from "../../hooks/useThemeToggle";
import CustomAppBarProps from "../../interface/CustomAppBarProps";

const CustomAppBar: React.FC<CustomAppBarProps> = ({ title, userName }) => {
  const { darkMode, toggleTheme, theme } = useThemeToggle();
  const { logout } = useAuthentication();
  const { openMenu } = useDropDown();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    openMenu(event, [
      {
        label: `Hi, ${userName}`,
        onClick: () => {},
      },
      {
        label: "Logout",
        onClick: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.background.appBar }}>
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "700", color: "white" }}>
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: "10px 16px",
          }}>
          <IconButton
            size="large"
            edge="end"
            sx={{
              color: "white",
            }}
            aria-label="toggle theme"
            onClick={toggleTheme}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            sx={{
              color: "white",
            }}
            aria-label="toggle theme"
            onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
