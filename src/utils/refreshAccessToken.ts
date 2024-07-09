import axios from "axios";

const refreshAccessToken = async () => {
  const storedData = JSON.parse(localStorage.getItem("authData")!);
  if (!storedData?.refreshToken) return null;

  try {
    const response = await axios.post(
      "http://localhost:4200/api/v1/users/token",
      {
        token: storedData.refreshToken,
      }
    );
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