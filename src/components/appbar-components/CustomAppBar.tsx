import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import useAuthentication from "../../hooks/useAuthentication";
import useThemeToggle from "../../hooks/useThemeToggle";
import CustomAppBarProps from "../../interface/CustomAppBarProps";

const CustomAppBar: React.FC<CustomAppBarProps> = ({ title }) => {
  const { darkMode, toggleTheme, theme } = useThemeToggle();
  const { logout } = useAuthentication();

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
          <Button
            color="secondary"
            variant="contained"
            disableElevation
            sx={{ mx: 2, fontWeight: 700 }}
            onClick={async () => {
              await logout();
            }}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
