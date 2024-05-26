import { ReactNode, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Socket, io } from "socket.io-client";
import SocketContext from "./SocketContext";

const initializeSocket = async (path: string): Promise<Socket | null> => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      resolve(null);
    }
    const socket: Socket = io("http://localhost:4200", {
      auth: {
        token,
      },
      query: {
        path,
      },
    });
    socket.on("connect", () => {
      resolve(socket);
    });
    socket.on("disconnect", () => {
      resolve(null);
    });
    socket.on("connect_error", (error) => {
      resolve(null);
    });
  });
};
interface SocketProviderProps {
  children: ReactNode;
}
const SocketContextProvider = ({ children }: SocketProviderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const initialise = async () => {
      console.log("initialize socket called");
      try {
        const pathname: string = location.pathname;
        if (/^\/home\/[^/]+$/.test(pathname)) {
          console.log("it wil not be executed at the time of rendering");
          const newSocket: Socket | null = await initializeSocket(pathname);
          setSocket(newSocket);
          if (!newSocket || !newSocket.connected) {
            navigate("/not_authorised_to_view_this_page");
          }
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
  }, [navigate, location.pathname]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
