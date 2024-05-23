import { useState } from "react";
import "../assets/styles/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import useAuthentication from "../contexts/AuthContext/useAuthentication";

const Signup = () => {
  const { register } = useAuthentication();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSignupSubmit = (e: any) => {
    e.preventDefault();
    if (!userName.trim()) {
      alert("Username is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return;
    }

    if (password.length !== confirmPassword.length) {
      alert("Passwords do not match");
      return;
    }

    register(userName, email, password);
  };
  return (
    <div className="signup-component">
      <h2>REGISTRATION</h2>
      <div className="input-fields">
        <form onSubmit={handleSignupSubmit} className="form-container">
          <label>UserName:</label>
          <input
            className="signup-field"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label>Email:</label>
          <input
            className="signup-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label>Password:</label>
          <input
            className="signup-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Confirm Password:</label>
          <input
            className="signup-field"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="signup-btn">Signup</button>
        </form>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};
export default Signup;
