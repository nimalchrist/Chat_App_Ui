import { createContext } from "react";
import { Socket } from "socket.io-client";

interface SocketContextProps {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);
export default SocketContext;
