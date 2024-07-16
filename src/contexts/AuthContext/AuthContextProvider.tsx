import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSnackBar from "../../hooks/useSnackBar";
import AuthProviderProps from "../../interface/AuthProviderProps";
import AuthContext from "./AuthContext";

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const { showMessage } = useSnackBar();
  const [authData, setAuthData] = useState({
    accessToken: null,
    refreshToken: null,
    user: null,
  });

  // registration controller
  const register = async (
    userName: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:4200/api/v1/users/register",
        { userName, email, password }
      );
      if (response.status === 201) {
        showMessage(
          "User registered successfully. Please login to continue",
          "success"
        );
        navigate("/");
      }
    } catch (error: any) {
      if (error.response) {
        showMessage(error.response.data.message, "error");
      } else if (error.request) {
        showMessage(
          "No response from the server. Please try again later.",
          "error"
        );
      } else {
        showMessage("An error occurred while logging in.", "error");
      }
    }
  };

  // login controller
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:4200/api/v1/users/login",
        { email, password }
      );
      if (response.status === 200) {
        storeAuthData(response.data);
        showMessage("Login successfull", "success");
        navigate("/home");
      }
    } catch (error: any) {
      if (error.response) {
        showMessage(error.response.data.message, "error");
      } else if (error.request) {
        showMessage(
          "No response from the server. Please try again later.",
          "error"
        );
      } else {
        showMessage("An error occurred while logging in.", "error");
      }
    }
  };

  const logout = useCallback(async () => {
    try {
      await axios.post("http://localhost:4200/api/v1/users/logout", {
        token: authData.refreshToken,
      });
      setAuthData({
        accessToken: null,
        refreshToken: null,
        user: null,
      });
      localStorage.removeItem("authData");
      navigate("/");
    } catch (error) {
      showMessage("Server error occurred", "error");
    }
  }, [authData.refreshToken, navigate, showMessage]);

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await axios.post(
        "http://localhost:4200/api/v1/users/token",
        {
          token: authData.refreshToken,
        }
      );
      const newAuthData = {
        ...authData,
        accessToken: response.data.accessToken,
      };
      storeAuthData(newAuthData);
      return response.data.accessToken;
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      await logout();
      return null;
    }
  }, [authData, logout]);

  //helper function to store the authentication data
  const storeAuthData = (data: any) => {
    setAuthData(data);
    localStorage.setItem("authData", JSON.stringify(data));
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("authData")!);
    if (storedData) {
      setAuthData(storedData);
    }
  }, []);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      async (config) => {
        if (authData.accessToken) {
          config.headers.Authorization = `Bearer ${authData.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response &&
          error.response.status === 401 &&
          authData.refreshToken
        ) {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [authData, logout, refreshAccessToken]);

  return (
    <AuthContext.Provider value={{ authData, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
