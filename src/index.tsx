import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, Routes } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Signup from "./pages/Signup";
import ChatRoom from "./pages/ChatRoom";
import AuthProvider from "./contexts/AuthContext/AuthContextProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<ChatRoom />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
reportWebVitals();
