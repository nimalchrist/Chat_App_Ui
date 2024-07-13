import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "../assets/styles/ChatRoom.css";
import TextInput from "../components/text-components/TextInput";
import useSnackBar from "../hooks/useSnackBar";
import useAuthentication1 from "../hooks/useAuthentication";
import axios from "axios";
import CustomAppBar from "../components/appbar-components/CustomAppBar";

const ChatRoomPage = () => {
  const navigate = useNavigate();
  const [createRoomName, setCreateRoomName] = useState("");
  const [joinRoomName, setJoinRoomName] = useState("");
  const { logout } = useAuthentication1();
  const { showMessage } = useSnackBar();

  // handlers
  const handleCreateRoom = async () => {
    if (createRoomName) {
      try {
        const response = await axios(
          `http://localhost:4200/api/v1/rooms/create/${createRoomName}`
        );
        if (response.status === 200) {
          showMessage("Room created successfully", "success");
          navigate(`/home/${createRoomName}`);
          setCreateRoomName("");
        }
      } catch (error: any) {
        if (error.response.status === 403) {
          showMessage(
            "Room name is already exist. Try to create a unique room",
            "error"
          );
          setCreateRoomName("");
        } else if (error.response.status === 401) {
          showMessage("Room name is missing", "error");
          setCreateRoomName("");
        } else {
          showMessage("something went wrong. Try again later", "error");
          setCreateRoomName("");
        }
      }
    }
  };
  const handleJoinRoom = async () => {
    if (joinRoomName) {
      try {
        const response = await axios(
          `http://localhost:4200/api/v1/rooms/join/${joinRoomName}`
        );

        if (response.status === 200) {
          navigate(`/home/${joinRoomName}`);
          setJoinRoomName("");
        } else {
          showMessage(
            "The entered room is not available. Try creating a new room or Enter a valid room name",
            "warning"
          );
          setJoinRoomName("");
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          showMessage("Unauthorized access. Please log in.", "warning");
        } else {
          showMessage(
            "The entered room is not available. Try creating a new room or enter a valid room name.",
            "warning"
          );
        }
        setJoinRoomName("");
      }
    }
  };
  return (
    <>
      <CustomAppBar title="Chatify" />
      <Box className="chat-room-container">
        <Box className="chat-room-list">
          <Typography variant="h5">Previous Rooms</Typography>
          <List>
            <ListItem>
              <ListItemText primary="1" />
            </ListItem>
            <ListItem>
              <ListItemText primary="2" />
            </ListItem>
            <ListItem>
              <ListItemText primary="3" />
            </ListItem>
          </List>
        </Box>
        <Box className="chat-room">
          <Box className="room-fields-section">
            <Box className="create-room-section">
              <TextInput
                label="Enter room name to create"
                type="text"
                onChange={(e) => setCreateRoomName(e.target.value)}
                value={createRoomName}
              />
              {createRoomName && !joinRoomName && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleCreateRoom}>
                    Create Room
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setCreateRoomName("")}>
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>
            <Box className="join-room-section">
              <TextInput
                type="text"
                label="Enter room name to join"
                value={joinRoomName}
                onChange={(e) => setJoinRoomName(e.target.value)}
              />
              {joinRoomName && !createRoomName && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleJoinRoom}>
                    Join Room
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setJoinRoomName("")}>
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatRoomPage;
