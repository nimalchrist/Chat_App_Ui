import { io, Socket } from "socket.io-client";
import refreshAccessToken from "../utils/refreshAccessToken";

// service layer for socketServer
const initialiseSocket = async (path: string): Promise<Socket | null> => {
  return new Promise(async (resolve, reject) => {
    let storedData = JSON.parse(localStorage.getItem("authData")!);
    let token = storedData!.accessToken;
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
    socket.on("disconnect", async () => {
      resolve(null);
    });
    socket.on("connect_error", async (error) => {
      token = await refreshAccessToken();
      if (token) {
        storedData = JSON.parse(localStorage.getItem("authData")!);
        const newSocket: Socket = io("http://localhost:4200", {
          auth: { token },
          query: { path },
        });
        resolve(newSocket);
      } else {
        window.location.href = "/";
        resolve(null);
      }
    });
  });
};

export default initialiseSocket;
