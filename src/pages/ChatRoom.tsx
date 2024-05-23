import Chat from "../components/chat-components/Chat";
import "../assets/styles/Chat.css";
import SokcetProvider from "../contexts/SocketContext/SocketContextProvider";

const ChatRoom = () => {
  return (
    <SokcetProvider>
      <div className="chat-room">
        <h1 className="title">Chatify</h1>
        {/* just now only single room */}
        <Chat />
      </div>
    </SokcetProvider>
  );
};
export default ChatRoom;
