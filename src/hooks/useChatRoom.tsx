import { useEffect, useState } from "react";
import useAuthentication from "./useAuthentication";
import useSnackBar from "./useSnackBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useChatRoom = () => {
  const navigate = useNavigate();
  const { authData } = useAuthentication();
  const { showMessage } = useSnackBar();
  const [rooms, setRooms] = useState([]);
  const [createRoomName, setCreateRoomName] = useState("");
  const [joinRoomName, setJoinRoomName] = useState("");

  // Used to fetch the past rooms of the user
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
      } catch (error) {
        handleError(error);
      }
    }
  };

  // handler for room creation
  const handleCreateRoom = async () => {
    if (createRoomName) {
      try {
        const response = await axios(
          `http://localhost:4200/api/v1/rooms/create/${createRoomName}`
        );
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
      const response = await axios(
        `http://localhost:4200/api/v1/rooms/join/${joinRoomName}`
      );

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
      const response = await axios.post(
        "http://localhost:4200/api/v1/rooms/delete",
        {
          roomId: room.roomId,
          userId: authData.user!._id,
        }
      );
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
      const response = await axios.post(
        "http://localhost:4200/api/v1/rooms/leave",
        { roomId: room.roomId, userId: authData.user!._id }
      );
      if (response.status === 200) {
        showMessage("Successfully left", "success");
        await fetchRooms();
      }
    } catch (error) {
      handleError(error);
    }
  };

  // supportive method to show customised error message
  const handleError = (error: any) => {
    if (error.response && error.response.data  && error.response.status !== 401) {
      showMessage(error.response.data.message, "error");
    } else {
      showMessage("Login session expired. Please login to continue", "error");
    }
  };

  useEffect(() => {
    fetchRooms();
    const timer = setTimeout(() => {
      
      fetchRooms();
    }, 3000);
    return () => clearTimeout(timer);
  }, [authData]);

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
