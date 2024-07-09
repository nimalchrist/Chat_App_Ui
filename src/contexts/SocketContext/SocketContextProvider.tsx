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
    console.log(2);
    try {
      const pathname = location.pathname;
      if (/^\/home\/[^/]+$/.test(pathname)) {
        console.log(3);
        const newSocket = await initialiseSocket(pathname);
        console.log(newSocket);
        setSocket(newSocket);
        if (!newSocket || !newSocket.connected) {
          navigate("/not_authorised_to_view_this_page");
        }
      }
    } catch (error) {
      setSocket(null);
      navigate("/not_authorised_to_view_this_page");
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    console.log(1);
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
