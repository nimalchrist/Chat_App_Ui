import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import TextInput from "../components/text-components/TextInput";
import CustomAppBar from "../components/appbar-components/CustomAppBar";
import ChatRoomList from "../components/chatroom-components/ChatRoomList";
import useChatRoom from "../hooks/useChatRoom";
import "../assets/styles/ChatRoom.css";

const ChatRoomPage = () => {
  const navigate = useNavigate();
  const {
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
  } = useChatRoom();

  const handleViewButtonClick = (roomName: string) => {
    navigate(`/home/${roomName}`);
  };
  return (
    <>
      <CustomAppBar title="Chatify" />
      <Box className="chat-room-container">
        <Box className="chat-room-list">
          <ChatRoomList
            authData={authData}
            rooms={rooms}
            handleDeleteRoom={handleDeleteRoom}
            handleLeaveRoom={handleLeaveRoom}
            handleViewButtonClick={handleViewButtonClick}
          />
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
