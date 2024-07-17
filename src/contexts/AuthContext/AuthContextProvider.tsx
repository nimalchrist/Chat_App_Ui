import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSnackBar from "../../hooks/useSnackBar";
import AuthProviderProps from "../../interface/AuthProviderProps";
import { loginUser, logoutUser, registerUser } from "../../services/apiClient";
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
      const response = await registerUser(userName, email, password);
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
      const response = await loginUser(email, password);
      storeAuthData(response);
      showMessage("Login successfull", "success");
      navigate("/home");
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
      await logoutUser(authData.refreshToken!);
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
  return (
    <AuthContext.Provider value={{ authData, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
