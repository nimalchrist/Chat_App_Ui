import { io, Socket } from "socket.io-client";
import jwtDecode from "./jwtDecode";
import refreshAccessToken from "./refreshAccessToken";

const initialiseSocket = async (path: string): Promise<Socket | null> => {
  return new Promise(async (resolve, reject) => {
    let storedData = JSON.parse(localStorage.getItem("authData")!);
    let token = storedData?.accessToken;
    if (token) {
      const tokenExpDate = new Date(jwtDecode(token).exp * 1000);
      if (tokenExpDate <= new Date()) {
        token = await refreshAccessToken();
        storedData = JSON.parse(localStorage.getItem("authData")!);
      }
    }
    if (!token) {
      resolve(null);
      return;
    }
    const socket: Socket = io("http://localhost:4200", {
      auth: { token },
      query: { path },
    });
    socket.on("connect", () => {
      resolve(socket);
    });
    socket.on("disconnect", () => {
      resolve(null);
    });
    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      resolve(null);
    });
  });
};

export default initialiseSocket;