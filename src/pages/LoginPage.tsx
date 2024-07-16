import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import LoginForm from "../components/login-components/LoginForm";
import { validateEmail, validatePassword } from "../utils/validation";
import useSnackBar from "../hooks/useSnackBar";
import useAuthentication from "../hooks/useAuthentication";
import "../assets/styles/Login.css";
import useThemeToggle from "../hooks/useThemeToggle";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { showMessage } = useSnackBar();
  const { login, authData } = useAuthentication();
  const { theme } = useThemeToggle();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      showMessage("Invalid email format", "error");
      return;
    }
    const { isValid, message } = validatePassword(password);
    if (!isValid) {
      showMessage(message, "error");
      return;
    }
    await login(email, password);
  };

  useEffect(() => {
    if (authData.accessToken) {
      navigate("/home");
    }
  }, [authData.accessToken, navigate]);

  return (
    <Box
      className="login-component"
      sx={{ backgroundColor: theme.palette.background.default }}>
      <Typography
        variant="h5"
        sx={{ color: theme.palette.text.primary, fontWeight: 700 }}>
        LOGIN
      </Typography>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLoginSubmit={handleLoginSubmit}
      />
    </Box>
  );
};

export default Login;
