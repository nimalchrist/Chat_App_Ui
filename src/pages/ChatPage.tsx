import { useParams } from "react-router-dom";
import Chat from "../components/chat-components/Chat";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";
import { Box } from "@mui/material";

const ChatPage = () => {
  useAuthenticatedUser();
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <Box className="chat-component">
      <Chat roomData={roomId} />
    </Box>
  );
};
export default ChatPage;
