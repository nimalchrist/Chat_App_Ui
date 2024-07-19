import { useState } from "react";
import SignupForm from "../components/signup-components/SignupForm";
import { validateEmail, validatePassword } from "../utils/validation";
import { Box, Typography } from "@mui/material";
import "../assets/styles/Signup.css";
import useSnackBar from "../hooks/useSnackBar";
import useAuthentication1 from "../hooks/useAuthentication";
import useThemeToggle from "../hooks/useThemeToggle";

const Signup = () => {
  const { register } = useAuthentication1();
  const { showMessage } = useSnackBar();
  const { theme } = useThemeToggle();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userName.trim()) {
      showMessage("Username is required", "warning");
      return;
    }
    if (!validateEmail(email)) {
      showMessage("Invalid email format", "error");
      return;
    }
    const { isValid, message } = validatePassword(password);
    if (!isValid) {
      showMessage(message, "error");
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Passwords do not match", "error");
      return;
    }
    await register(userName, email, password);
  };

  return (
    <Box
      className="signup-component"
      sx={{ backgroundColor: theme.palette.background.default }}>
      <Typography
        variant="h5"
        sx={{ color: theme.palette.text.primary, fontWeight: 700 }}>
        REGISTER
      </Typography>
      <SignupForm
        userName={userName}
        setUserName={setUserName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleSignupSubmit={handleSignupSubmit}
      />
    </Box>
  );
};

export default Signup;
