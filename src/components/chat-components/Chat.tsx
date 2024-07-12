import React, { useState, useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";
import useAuthentication from "../../hooks/useAuthentication";
import useSocket from "../../hooks/useSocket";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import ClientCount from "./ClientCount";
import ChatProps from "../../interface/ChatProps";
import Message from "../../interface/Message";

const Chat: React.FC<ChatProps> = ({ roomName }) => {
  const { socket, setSocket } = useSocket();
  const [roomKey, setRoomKey] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [clientsTotal, setClientsTotal] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const messageContainerRef = useRef<HTMLUListElement>(null);
  const { authData, logout } = useAuthentication();

  // Event handlers
  const handleSendMessage = (message: string) => {
    if (!socket || !roomKey) return;

    const newMessage: Message = {
      name: authData.user!.userName,
      message,
      dateTime: new Date(),
      userId: authData.user!._id,
    };
    socket.emit("message", newMessage, roomKey);
  };

  const handleFeedback = (feedback: string) => {
    if (socket && roomKey) {
      socket.emit("feedback", { feedback, roomId: roomKey });
    }
  };

  const handleChatMessage = (receivedMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  };

  const handleLoadMessage = (chatHistory: Message[]) => {
    setMessages(chatHistory);
  };

  const handleRoomKey = (roomKey: string) => {
    setRoomKey(roomKey);
  };

  const handleUpdateFeedback = (feedback: string) => {
    setFeedback(feedback);
  };

  const handleClientsTotal = (totalClients: number) => {
    setClientsTotal(totalClients);
  };

  const handleLogout = async () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
    await logout();
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo(
        0,
        messageContainerRef.current.scrollHeight
      );
    }
  };

  // useEffect hooks
  useEffect(() => {
    if (socket && roomName) {
      socket.emit("chat", roomName, authData.user!._id);
      socket.on("load-messages", handleLoadMessage);
      socket.on("room-key", handleRoomKey);
      socket.on("chat-message", handleChatMessage);
      socket.on("feedback", handleUpdateFeedback);
      socket.on("clients-total", handleClientsTotal);
      return () => {
        socket.off("load-messages", handleLoadMessage);
        socket.off("room-key", handleRoomKey);
        socket.off("chat-message", handleChatMessage);
        socket.off("feedback", handleUpdateFeedback);
        socket.off("clients-total", handleClientsTotal);
      };
    }
  }, [socket, roomName, authData.user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, feedback]);

  if (!authData.user) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      className="chat-container"
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "350px",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "20px auto",
          width: "80%",
        }}>
        <h2>{roomName}</h2>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Box className="chat-window">
        <Box className="chat-username">
          <span>
            <i className="far fa-user"></i>
          </span>
          <h3 className="username">{authData.user!.userName}</h3>
        </Box>
        <MessageList
          messages={messages}
          feedback={feedback}
          ref={messageContainerRef}
          userId={authData.user!._id}
        />
        <MessageForm
          userName={authData.user!.userName}
          onSendMessage={handleSendMessage}
          onFeedback={handleFeedback}
        />
        <ClientCount total={clientsTotal} />
      </Box>
    </Box>
  );
};

export default Chat;
