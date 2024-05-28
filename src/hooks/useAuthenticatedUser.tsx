import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserData from "../dto/AuthenticatedUserData";
import useAuthentication from "./useAuthentication";

const useAuthenticatedUser = () => {
  const navigate = useNavigate();
  const [parsedUserData, setParsedUserData] = useState<UserData | null>(null);
  const { auth } = useAuthentication();
  useEffect(() => {
    console.log("useAuthenticatedUser effect called");
    const data: string | null = localStorage.getItem("authData");
    if (!data) {
      console.log("No auth data found, navigating to login page.");
      navigate("/");
      return;
    }
    if (!auth.accessToken) {
      console.log("User not authenticated, navigating to not authorized page.");
      navigate("/not_authorised_to_view_this_page");
      return;
    }
    try {
      const parsedData: UserData = JSON.parse(data);
      setParsedUserData(parsedData);
    } catch (error) {
      navigate("/");
    }
  }, [navigate, auth.accessToken]);

  return parsedUserData;
};

export default useAuthenticatedUser;
