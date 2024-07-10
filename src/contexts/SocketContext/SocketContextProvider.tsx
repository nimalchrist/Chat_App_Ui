import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import SocketContext from "./SocketContext";
import SocketProviderProps from "../../interface/SocketProviderProps";
import initialiseSocket from "../../utils/initialiseSocket";

const SocketContextProvider = ({ children }: SocketProviderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [socket, setSocket] = useState<Socket | null>(null);

  const initialiseSocketConnection = useCallback(async () => {
    try {
      const pathname = location.pathname;
      if (/^\/home\/[^/]+$/.test(pathname)) {
        const newSocket = await initialiseSocket(pathname);
        setSocket(newSocket);
        if (!newSocket || !newSocket.connected) {
          navigate("/not_authorised_to_view_this_page");
          return;
        }
      }
    } catch (error) {
      setSocket(null);
      navigate("/not_authorised_to_view_this_page");
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    initialiseSocketConnection();
    return () => {
      socket?.disconnect();
    };
  }, [initialiseSocketConnection]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
