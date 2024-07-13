import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import CustomAppBarProps from "../../interface/CustomAppBarProps";

const CustomAppBar: React.FC<CustomAppBarProps> = ({ title }) => {
  const { logout } = useAuthentication();
  //   const [darkMode, setDarkMode] = useState(false);

  //   const handleThemeToggle = () => {
  //     setDarkMode(!darkMode);
  //   };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, fontSize: "bold", fontWeight: "26px" }}>
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: "10px 16px",
          }}>
          {/* <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="toggle theme"
            onClick={handleThemeToggle}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton> */}
          <Button
            color="error"
            variant="contained"
            disableElevation
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
