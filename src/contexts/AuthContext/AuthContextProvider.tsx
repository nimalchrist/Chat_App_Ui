import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import LoginSuccessResponse from "../../interface/LoginSuccessResponse";
import useSnackBar from "../../hooks/useSnackBar";
import AuthProviderProps from "../../interface/AuthProviderProps";

const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const { showMessage } = useSnackBar();
  const [auth, setAuth] = useState({
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  });

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:4200/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data: LoginSuccessResponse = await response.json();
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
        showMessage(
          errorData.message || "An error occurred while logging in.",
          "error"
        );
      }
    } catch (error: any) {
      showMessage("An error occurred while logging in.", "error");
    }
  };
  const logout = async () => {
    const bodyPayload = {
      token: localStorage.getItem("refreshToken"),
    };
    try {
      const response = await fetch(
        "http://localhost:4200/api/v1/users/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyPayload),
        }
      );
      if (response.ok) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("authData");
        setAuth({ accessToken: null, refreshToken: null });
        navigate("/");
      } else {
        showMessage("Server error occured", "error");
      }
    } catch (error: any) {
      showMessage(error, "error");
    }
    setAuth({ accessToken: null, refreshToken: null });
    navigate("/");
  };
  const register = async (
    userName: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await fetch(
        "http://localhost:4200/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, email, password }),
        }
      );
      if (response.ok) {
        showMessage(
          "user registered successfully. Please login to continue",
          "success"
        );
        navigate("/");
      }
    } catch (error: any) {
      showMessage("An error occurred while signing in.", "error");
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch(
          "http://localhost:4200/api/v1/users/isLogined",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        if (response.ok) {
          await response.json();
        } else {
          setAuth({ accessToken: null, refreshToken: null });
        }
      } catch (error) {
        setAuth({ accessToken: null, refreshToken: null });
      }
    };
    const checkTokenExpiry = () => {
      const { accessToken } = auth;
      if (!accessToken) return;

      const decodedToken = JSON.parse(atob(accessToken.split(".")[1]));
      const expirationTime = decodedToken.exp * 1000;
      if (Date.now() >= expirationTime) {
        getAccessTokenFromRefreshToken();
      }
    };
    const getAccessTokenFromRefreshToken = async () => {
      try {
        const { refreshToken } = auth;
        const response = await fetch(
          "http://localhost:4200/api/v1/users/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: refreshToken }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAuth((prev) => ({
            ...prev,
            accessToken: data.accessToken,
          }));
          localStorage.setItem("accessToken", data.accessToken);
        } else {
          logout();
        }
      } catch (error) {
        showMessage("Token refresh failed. Please log in again.", "error");
        logout();
      }
    };

    checkLogin();
    const intervalId = setInterval(checkTokenExpiry, 1000 * 60 * 15);
    return () => clearInterval(intervalId);
  }, [auth.accessToken]);

  return (
    <AuthContext.Provider value={{ auth, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
