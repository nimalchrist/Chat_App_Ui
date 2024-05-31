import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import NoPage from "./pages/NoPage";
import Signup from "./pages/SignupPage";
import ChatRoomPage from "./pages/ChatRoomPage";
import AuthProvider from "./contexts/AuthContext/AuthContextProvider";
import SocketProvider from "./contexts/SocketContext/SocketContextProvider";
import ChatPage from "./pages/ChatPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<ChatRoomPage />} />
          <Route path="/home/:roomId" element={<ChatPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>
);
reportWebVitals();
