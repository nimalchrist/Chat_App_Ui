import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import useThemeToggle from "../../hooks/useThemeToggle";
import LoginFormProps from "../../interface/LoginFormProps";
import TextInput from "../text-components/TextInput";

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLoginSubmit,
}) => {
  // theme toggler hook to toggle between dark and light theme
  const { theme } = useThemeToggle();
  return (
    <Box
      className="input-fields"
      sx={{ backgroundColor: theme.palette.background.paper }}>
      <form onSubmit={handleLoginSubmit} className="login-form">
        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className="login-btn">
          Login
        </Button>
      </form>
      <Typography variant="inherit" sx={{ color: theme.palette.text.primary }}>
        Don't have an account?{" "}
        <Link
          to="/signup"
          style={{
            color:
              theme.palette.mode === "dark"
                ? theme.palette.text.primary
                : theme.palette.primary.main,
            textDecoration: "none",
          }}>
          Signup
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
