import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserData from "../interface/UserData";
import useAuthentication from "./useAuthentication";

const useAuthenticatedUser = () => {
  const navigate = useNavigate();
  const [parsedUserData, setParsedUserData] = useState<UserData | null>(null);
  const { auth } = useAuthentication();
  useEffect(() => {
    console.log("custom hook");
    const data: string | null = localStorage.getItem("authData");
    if (!auth.accessToken) {
      navigate("/");
      return;
    }
    if (!data) {
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
