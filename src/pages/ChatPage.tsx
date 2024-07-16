import { useNavigate, useParams } from "react-router-dom";
import { Box, List, Typography } from "@mui/material";
import useRoomSwitchList from "../hooks/useRoomSwitchList";
import Chat from "../components/chat-components/Chat";
import CustomAppBar from "../components/appbar-components/CustomAppBar";
import SwitchChatList from "../components/chat-components/SwitchChatList";
import useThemeToggle from "../hooks/useThemeToggle";
import "../assets/styles/Chat.css";

const ChatPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const { rooms } = useRoomSwitchList();
  const { theme } = useThemeToggle();

  const handleRoomClick = (roomName: string) => {
    navigate(`/home/${roomName}`, { replace: true });
  };

  return (
    <>
      <CustomAppBar title={roomId!} />
      <Box
        className="chat-component"
        sx={{ backgroundColor: theme.palette.background.default }}>
        <Box
          className="switch-rooms-list"
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: "25px",
          }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "26px",
              fontWeight: "700",
              my: "16px",
              color: theme.palette.text.primary,
            }}>
            Switch Rooms
          </Typography>
          {rooms.length === 0 ? (
            <Typography
              variant="h6"
              sx={{
                fontWeight: "400",
                my: "16px",
                color: theme.palette.text.primary,
              }}>
              No past rooms
            </Typography>
          ) : (
            <List>
              <SwitchChatList
                roomId={roomId!}
                rooms={rooms}
                handleRoomClick={handleRoomClick}
              />
            </List>
          )}
        </Box>
        <Chat roomName={roomId} />
      </Box>
    </>
  );
};
export default ChatPage;
