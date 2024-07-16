import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import useThemeToggle from "../../hooks/useThemeToggle";
import SignupFormProps from "../../interface/SignupFormProps";
import TextInput from "../text-components/TextInput";

const SignupForm: React.FC<SignupFormProps> = ({
  userName,
  setUserName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleSignupSubmit,
}) => {
  const { theme } = useThemeToggle();
  return (
    <Box
      className="input-fields"
      sx={{ backgroundColor: theme.palette.background.paper }}>
      <form onSubmit={handleSignupSubmit} className="form-container">
        <TextInput
          label="UserName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
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
        <TextInput
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className="signup-btn">
          Signup
        </Button>
      </form>
      <Typography variant="inherit" sx={{ color: theme.palette.text.primary }}>
        Already have an account?{" "}
        <Link
          to="/"
          style={{
            color:
              theme.palette.mode === "dark"
                ? theme.palette.text.primary
                : theme.palette.primary.main,
            textDecoration: "none",
          }}>
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default SignupForm;
