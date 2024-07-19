import { Socket } from "socket.io-client";

export default interface SocketContextProps {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}
