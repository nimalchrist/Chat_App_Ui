import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import AuthProviderProps from "../../interface/AuthProviderProps";
import AuthContext from "./AuthContext";
import useSnackBar from "../../hooks/useSnackBar";
import jwtDecode from "../../utils/jwtDecode";
import axios from "axios";

const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const { showMessage } = useSnackBar();
  const [authData, setAuthData] = useState({
    accessToken: null,
    refreshToken: null,
    user: null,
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("authData")!);
    if (storedData) {
      setAuthData(storedData);
    }
  }, []);

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
        if (error.response.status === 401 || error.response.status === 400) {
          showMessage(error.response.data.message, "error");
        } else {
          showMessage("An error occurred while logging in.", "error");
        }
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
        if (error.response.status === 401 || error.response.status === 400) {
          showMessage(error.response.data.message, "error");
        } else {
          showMessage("An error occurred while logging in.", "error");
        }
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logout = async () => {
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
  };

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
      logout();
      return null;
    }
  }, [authData, logout]);

  const storeAuthData = (data: any) => {
    setAuthData(data);
    localStorage.setItem("authData", JSON.stringify(data));
  };

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      async (config) => {
        if (authData.accessToken) {
          const tokenExpDate = new Date(
            jwtDecode(authData.accessToken).exp * 1000
          );
          if (tokenExpDate <= new Date()) {
            const newAccessToken = await refreshAccessToken();
            config.headers.Authorization = `Bearer ${newAccessToken}`;
          } else {
            config.headers.Authorization = `Bearer ${authData.accessToken}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          error.response.status === 401 &&
          authData.refreshToken
        ) {
          try {
            const newAccessToken = await refreshAccessToken();
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(error.config);
          } catch (refreshError) {
            logout();
            return Promise.reject(refreshError);
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
