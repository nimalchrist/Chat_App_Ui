import { useContext } from "react";
import SocketContext from "../contexts/SocketContext/SocketContext";

// custom hook to simplify the socket context handling
const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
export default useSocket;
