import { useNavigate, useParams } from "react-router-dom";
import { Box, List, Typography } from "@mui/material";
import useRoomSwitch from "../hooks/useRoomSwitch";
import Chat from "../components/chat-components/Chat";
import CustomAppBar from "../components/appbar-components/CustomAppBar";
import SwitchChatList from "../components/chat-components/SwitchChatList";
import "../assets/styles/Chat.css";

const ChatPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const { rooms } = useRoomSwitch();
  const handleRoomClick = (roomName: string) => {
    navigate(`/home/${roomName}`, { replace: true });
  };

  return (
    <>
      <CustomAppBar title={roomId!} />
      <Box className="chat-component">
        <Box className="switch-rooms-list">
          <Typography
            variant="h2"
            sx={{ fontSize: "26px", fontWeight: "bold", my: "16px" }}>
            Switch Rooms
          </Typography>
          {rooms.length === 0 ? (
            <Typography variant="h6">No past rooms</Typography>
          ) : (
            <List>
              <SwitchChatList rooms={rooms} handleRoomClick={handleRoomClick} />
            </List>
          )}
        </Box>
        <Chat roomName={roomId} />
      </Box>
    </>
  );
};
export default ChatPage;
