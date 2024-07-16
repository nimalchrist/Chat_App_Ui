import { io, Socket } from "socket.io-client";
import refreshAccessToken from "./refreshAccessToken";

const initialiseSocket = async (path: string): Promise<Socket | null> => {
  return new Promise(async (resolve, reject) => {
    let storedData = JSON.parse(localStorage.getItem("authData")!);
    let token = storedData?.accessToken;
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
      token = await refreshAccessToken();
      if (token) {
        storedData = JSON.parse(localStorage.getItem("authData")!);
        const newSocket: Socket = io("http://localhost:4200", {
          auth: { token: storedData.accessToken },
          query: { path },
        });
        resolve(newSocket);
      } else {
        resolve(null);
      }
    });
    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      resolve(null);
    });
  });
};

export default initialiseSocket;
