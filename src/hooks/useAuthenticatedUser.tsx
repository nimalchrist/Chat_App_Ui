import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserData from "../dto/AuthenticatedUserData";
import useAuthentication from "./useAuthentication";

const useAuthenticatedUser = () => {
  const navigate = useNavigate();
  const [parsedUserData, setParsedUserData] = useState<UserData | null>(null);
  const { isAuthenticated } = useAuthentication();
  useEffect(() => {
    console.log(
      "expected to be called at the time of homepage loading and chat ui loading"
    );
    const data: string | null = localStorage.getItem("authData");
    if (!data) {
      navigate("/");
      return;
    }
    if (!isAuthenticated) {
      navigate("/not_authorised_to_view_this_page");
      return;
    }
    try {
      const parsedData: UserData = JSON.parse(data);
      setParsedUserData(parsedData);
    } catch (error) {
      navigate("/");
    }
  }, [navigate, isAuthenticated]);
  
  return parsedUserData;
};

export default useAuthenticatedUser;
