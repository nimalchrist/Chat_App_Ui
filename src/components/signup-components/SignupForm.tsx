import React from "react";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import TextInput from "../text-components/TextInput";
import SignupFormProps from "../../interface/SignupFormProps";

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
  return (
    <Box className="input-fields">
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
          color="primary"
          className="signup-btn">
          Signup
        </Button>
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </Box>
  );
};

export default SignupForm;
