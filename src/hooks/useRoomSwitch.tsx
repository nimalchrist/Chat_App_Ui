import { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import useSnackBar from "./useSnackBar";
import axios from "axios";

const useRoomSwitch = () => {
  const { authData } = useAuthentication();
  const { showMessage } = useSnackBar();
  const [rooms, setRooms] = useState([]);

  const fetchRooms = async () => {
    if (authData && authData.user) {
      try {
        const response = await axios.post(
          "http://localhost:4200/api/v1/rooms/get-rooms",
          { userId: authData.user._id },
          { headers: { Authorization: `Bearer ${authData.accessToken}` } }
        );
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
  }, [authData]);

  return { rooms };
};

export default useRoomSwitch;
