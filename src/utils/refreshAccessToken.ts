import { refreshAccessToken as accessTokenAPI } from "../services/apiClient";

const refreshAccessToken = async () => {
  const storedData = JSON.parse(localStorage.getItem("authData")!);
  if (!storedData) return null;
  if (!storedData!.refreshToken) return null;
  try {
    const response = await accessTokenAPI(storedData.refreshToken);
    const newAuthData = {
      ...storedData,
      accessToken: response.data.accessToken,
    };
    localStorage.setItem("authData", JSON.stringify(newAuthData));
    return response.data.accessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return null;
  }
};

export default refreshAccessToken;