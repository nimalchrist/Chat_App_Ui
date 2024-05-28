import { useParams } from "react-router-dom";
import Chat from "../components/chat-components/Chat";
import useAuthenticatedUser from "../hooks/useAuthenticatedUser";

const ChatPage = () => {
  useAuthenticatedUser();
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <div className="chat-component">
      <Chat roomId={roomId} />
    </div>
  );
};
export default ChatPage;
