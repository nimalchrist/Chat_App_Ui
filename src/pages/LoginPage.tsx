import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
// import useAuthentication from "../hooks/useAuthentication";
import LoginForm from "../components/login-components/LoginForm";
import { validateEmail, validatePassword } from "../utils/validation";
import useSnackBar from "../hooks/useSnackBar";
import "../assets/styles/Login.css";
import useAuthentication1 from "../hooks/useAuthentication";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { showMessage } = useSnackBar();
  const { login, authData } = useAuthentication1();

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
    <Box className="login-component">
      <h2>LOGIN</h2>
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
