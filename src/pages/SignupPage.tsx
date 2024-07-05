import { useState } from "react";
import useAuthentication from "../hooks/useAuthentication";
import SignupForm from "../components/signup-components/SignupForm";
import { validateEmail, validatePassword } from "../utils/validation";
import { Box } from "@mui/material";
import "../assets/styles/Signup.css";
import useSnackBar from "../hooks/useSnackBar";

const Signup = () => {
  const { register } = useAuthentication();
  const { showMessage } = useSnackBar();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    register(userName, email, password);
  };

  return (
    <Box className="signup-component">
      <h2>REGISTRATION</h2>
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
