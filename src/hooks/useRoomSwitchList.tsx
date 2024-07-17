import { useEffect, useState } from "react";
import { fetchRooms as fetchRoomsAPI } from "../services/apiClient";
import useAuthentication from "./useAuthentication";
import useSnackBar from "./useSnackBar";

const useRoomSwitchList = () => {
  const { authData } = useAuthentication();
  const { showMessage } = useSnackBar();
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    if (authData && authData.user) {
      try {
        const response = await fetchRoomsAPI(authData.user._id);
        if (response.status === 200) {
          setRooms(response.data.listOfRooms);
        }
      } catch (error: any) {
        if (error.response && error.response.data) {
          showMessage(error.response.data.message, "error");
        } else {
          showMessage("An error occurred", "error");
        }
      }
    }
  };

  useEffect(() => {
    fetchRooms();
    const timer = setTimeout(() => {
      fetchRooms();
    }, 2000);
    return () => clearTimeout(timer);
  }, [authData]);

  return { rooms };
};

export default useRoomSwitchList;
