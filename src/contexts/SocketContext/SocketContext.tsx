import { createContext } from "react";
import SocketContextProps from "../../interface/SocketContextProps";

const SocketContext = createContext<SocketContextProps | undefined>(undefined);
export default SocketContext;
