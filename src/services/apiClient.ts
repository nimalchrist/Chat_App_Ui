import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: "http://localhost:4200/api/v1",
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const authData = JSON.parse(localStorage.getItem("authData")!);
    if (authData && authData.accessToken) {
      config.headers!.Authorization = `Bearer ${authData.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authData = JSON.parse(localStorage.getItem("authData")!);
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      authData?.refreshToken
    ) {
      try {
        const response = await axios.post(
          `${apiClient.defaults.baseURL}/users/token`,
          {
            token: authData.refreshToken,
          }
        );
        authData.accessToken = response.data.accessToken;
        localStorage.setItem("authData", JSON.stringify(authData));
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("authData");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: any;
}

export const registerUser = async (
  userName: string,
  email: string,
  password: string
) => {
  return apiClient.post("/users/register", { userName, email, password });
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await apiClient.post("/users/login", { email, password });
  return response.data;
};

export const logoutUser = async (refreshToken: string) => {
  return apiClient.post("/users/logout", { token: refreshToken });
};

export const fetchRooms = async (userId: string) => {
  return apiClient.post("/rooms/get-rooms", { userId });
};

export const createRoom = async (roomName: string) => {
  return apiClient.get(`/rooms/create/${roomName}`);
};

export const joinRoom = async (roomName: string) => {
  return apiClient.get(`/rooms/join/${roomName}`);
};

export const deleteRoom = async (roomId: string, userId: string) => {
  return apiClient.post("/rooms/delete", { roomId, userId });
};

export const leaveRoom = async (roomId: string, userId: string) => {
  return apiClient.post("/rooms/leave", { roomId, userId });
};

export const searchMessages = (roomId: string, searchTerm: string) => {
  return apiClient.post("/rooms/search", { roomId, searchTerm });
};

export const refreshAccessToken = (token: string) => {
  return apiClient.post("/users/token", { token });
};
