import path from "path";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import SocketContext from "./SocketContext";

const initializeSocket = async (): Promise<Socket | null> => {
  return new Promise((resolve, reject) => {
    if (window.location.pathname === "/home") {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found");
        resolve(null);
      }
      const socket = io("http://localhost:4200", {
        auth: {
          token,
        },
        query: {
          path: "/home",
        },
      });
      socket.on("connect", () => {
        console.log("Socket connected: ", socket);
        resolve(socket);
      });
      socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket);
        resolve(null);
      });
      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        resolve(null);
      });
    } else {
      resolve(null);
    }
  });
};
interface SocketProviderProps {
  children: ReactNode;
}
const SocketContextProvider = ({ children }: SocketProviderProps) => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const initialise = async () => {
      try {
        const newSocket = await initializeSocket();
        setSocket(newSocket);
        if (!newSocket || !newSocket.connected) {
          navigate("/not_authorised_to_view_this_page");
        }
      } catch (error) {
        setSocket(null);
        navigate("/not_authorised_to_view_this_page");
      }
    };
    initialise();
    return () => {
      socket?.disconnect();
    };
  }, [navigate]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;