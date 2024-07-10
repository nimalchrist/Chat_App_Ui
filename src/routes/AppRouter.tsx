import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import NoPage from "../pages/NoPage";
import Signup from "../pages/SignupPage";
import ChatRoomPage from "../pages/ChatRoomPage";
import ChatPage from "../pages/ChatPage";
import AuthProvider from "../contexts/AuthContext/AuthContextProvider";
import SocketProvider from "../contexts/SocketContext/SocketContextProvider";
import SnackBarProvider from "../contexts/SnackBarContext/SnackBarContextProvider";
import ProtectedRoute from "../components/protected-routes/ProtectedRoute";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <SnackBarProvider>
        <AuthProvider>
          <SocketProvider>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<ChatRoomPage />} />
                <Route path="/home/:roomId" element={<ChatPage />} />
              </Route>
              <Route path="/signup" element={<Signup />} />
              <Route path="/*" element={<NoPage />} />
            </Routes>
          </SocketProvider>
        </AuthProvider>
      </SnackBarProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
