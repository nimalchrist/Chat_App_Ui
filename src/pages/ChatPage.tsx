import { useParams } from "react-router-dom";
import Chat from "../components/chat-components/Chat";
import { Box } from "@mui/material";
import "../assets/styles/Chat.css";

const ChatPage = () => {
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <Box className="chat-component">
      <Chat roomName={roomId} />
    </Box>
  );
};
export default ChatPage;
