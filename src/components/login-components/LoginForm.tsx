// components/Login/LoginForm.tsx
import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import TextInput from "../text-components/TextInput";
import LoginFormProps from "../../interface/LoginFormProps";

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLoginSubmit,
}) => {
  return (
    <Box className="input-fields">
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
          color="primary"
          className="login-btn">
          Login
        </Button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </Box>
  );
};

export default LoginForm;
