import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createRoom as createRoomAPI,
  deleteRoom as deleteRoomAPI,
  fetchRooms as fetchRoomsAPI,
  joinRoom as joinRoomAPI,
  leaveRoom as leaveRoomAPI,
} from "../services/apiClient";
import useAuthentication from "./useAuthentication";
import useSnackBar from "./useSnackBar";

const useChatRoom = () => {
  const navigate = useNavigate();
  const { authData } = useAuthentication();
  const { showMessage } = useSnackBar();
  const [rooms, setRooms] = useState([]);
  const [createRoomName, setCreateRoomName] = useState("");
  const [joinRoomName, setJoinRoomName] = useState("");

  // supportive method to show customised error message
  const handleError = useCallback(
    (error: any) => {
      if (
        error.response &&
        error.response.data &&
        error.response.status !== 401
      ) {
        showMessage(error.response.data.message, "error");
      } else {
        showMessage("Login session expired. Please login to continue", "error");
      }
    },
    []
  );

  // Used to fetch the past rooms of the user
  const fetchRooms = useCallback(async () => {
    if (authData && authData.user) {
      try {
        const response = await fetchRoomsAPI(authData.user._id);
        if (response.status === 200) {
          setRooms(response.data.listOfRooms);
        }
      } catch (error) {
        handleError(error);
      }
    }
  }, []);

  // handler for room creation
  const handleCreateRoom = async () => {
    if (createRoomName) {
      try {
        const response = await createRoomAPI(createRoomName);
        if (response.status === 201) {
          showMessage("Room created successfully", "success");
          navigate(`/home/${createRoomName}`);
          await fetchRooms();
          setCreateRoomName("");
        }
      } catch (error) {
        handleError(error);
        setCreateRoomName("");
      }
    }
  };

  // handler for join into a room
  const handleJoinRoom = async () => {
    try {
      const response = await joinRoomAPI(joinRoomName);
      if (response.status === 200) {
        navigate(`/home/${joinRoomName}`);
        setJoinRoomName("");
      }
    } catch (error) {
      handleError(error);
      setJoinRoomName("");
    }
  };

  // handler for deleting a room
  const handleDeleteRoom = async (room: any) => {
    try {
      const response = await deleteRoomAPI(room.roomId, authData.user!._id);
      if (response.status === 200) {
        showMessage("Room deleted successfully", "success");
        await fetchRooms();
      }
    } catch (error) {
      handleError(error);
    }
  };

  // handler for leaving from the room
  const handleLeaveRoom = async (room: any) => {
    try {
      const response = await leaveRoomAPI(room.roomId, authData.user!._id);
      if (response.status === 200) {
        showMessage("Successfully left", "success");
        await fetchRooms();
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [authData, fetchRooms]);

  return {
    authData,
    rooms,
    createRoomName,
    joinRoomName,
    setCreateRoomName,
    setJoinRoomName,
    handleCreateRoom,
    handleJoinRoom,
    handleDeleteRoom,
    handleLeaveRoom,
  };
};

export default useChatRoom;
