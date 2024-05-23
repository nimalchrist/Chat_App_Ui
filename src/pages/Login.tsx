import { useEffect, useState } from "react";
import "../assets/styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import useAuthentication from "../contexts/AuthContext/useAuthentication";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthentication();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLoginSubmit = async (e: any) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return;
    }
    if (!password.trim()) {
      alert("password is required");
      return;
    }
    login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="login-component">
      <h2>LOGIN</h2>
      <div className="input-fields">
        <form onSubmit={handleLoginSubmit} className="login-form">
          <label>Email:</label>
          <input
            className="login-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label>Password:</label>
          <input
            className="login-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-btn">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
