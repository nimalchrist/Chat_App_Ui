import React, { ReactNode, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:4200/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setAuth({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("authData", JSON.stringify(data.user));
        navigate("/home");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "An error occurred while logging in.");
      }
    } catch (error) {
      alert("An error occurred while logging in.");
    }
  };
  const logout = async () => {
    console.log("logout function called");
    setAuth({ accessToken: null, refreshToken: null });
    const bodyPayload = {
      token: localStorage.getItem("refreshToken"),
    };
    try {
      const response = await fetch("http://localhost:4200/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyPayload),
      });
      if (response.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("authData");
        setIsAuthenticated(false);
        navigate("/");
      } else {
        alert("Server error occured");
      }
    } catch (error) {
      alert(error);
    }
    setIsAuthenticated(false);
    navigate("/");
  };
  const register = async (
    userName: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch("http://localhost:4200/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
      });
      if (response.ok) {
        alert("user registered successfully. Please login to continue");
        navigate("/");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  // supportive methods
  const checkLogin = async () => {
    console.log("checking login status");
    try {
      const response = await fetch("http://localhost:4200/isLogined", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      if (response.ok) {
        await response.json();
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
    }
  };
  const getAccessTokenFromRefreshToken = async () => {
    console.log("getting accessToken from refreshToken");
    try {
      const { refreshToken } = auth;
      const response = await fetch("http://localhost:4200/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        setAuth((prev) => ({
          ...prev,
          accessToken: data.accessToken,
        }));
        localStorage.setItem("accessToken", data.accessToken);
      } else {
        console.log("refresh token is not valid");
        logout();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      alert("Token refresh failed. Please log in again.");
      logout();
    }
    console.log("got accessToken from refreshToken");
  };
  const checkTokenExpiry = () => {
    console.log("checking access token expiry");
    const { accessToken } = auth;
    if (!accessToken) return;

    const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
    const expirationTime = decodedToken.exp * 1000;
    if (Date.now() >= expirationTime) {
      getAccessTokenFromRefreshToken();
    }
  };
  useEffect(() => {
    checkLogin();
    const intervalId = setInterval(checkTokenExpiry, 1000 * 60 * 15);
    return () => clearInterval(intervalId);
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, auth, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
