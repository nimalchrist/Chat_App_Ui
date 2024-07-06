import React, { useState, useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";
import useAuthentication from "../../hooks/useAuthentication";
import useSocket from "../../hooks/useSocket";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import ClientCount from "./ClientCount";
import ChatProps from "../../interface/ChatProps";
import Message from "../../interface/Message";

const Chat: React.FC<ChatProps> = ({ roomData }) => {
  const { socket, setSocket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [clientsTotal, setClientsTotal] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const messageContainerRef = useRef<HTMLUListElement>(null);
  const { logout } = useAuthentication();
  const parsedUserData = useAuthenticatedUser();

  // handlers

  // callback for when the message is sent
  const handleSendMessage = (message: string) => {
    if (!socket) {
      console.error("Socket is not initialized");
      return;
    }
    const newMessage: Message = {
      name: parsedUserData!.userName,
      message,
      dateTime: new Date(),
      userId: parsedUserData!._id,
    };

    socket.emit("message", newMessage, roomData);
  };

  // callback for feedback
  const handleFeedback = (feedback: string) => {
    if (socket && roomData) {
      socket.emit("feedback", { feedback, roomId: roomData });
    }
  };

  // callback for whenever the chat message is received
  const handleChatMessage = (receivedMessage: Message) => {
    setMessages((prevMessages: Message[]) => [
      ...prevMessages,
      receivedMessage,
    ]);
  };

  const handleUpdateFeedback = (feedback: string) => {
    setFeedback(feedback);
  };

  const handleClientsTotal = (totalClients: number) => {
    setClientsTotal(totalClients);
  };
  const handleLogout = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
    if (roomData) {
      localStorage.setItem(
        `${parsedUserData?.userName}_${roomData}`,
        JSON.stringify(messages)
      );
    }
    logout();
  };

  // supportive methods
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo(
        0,
        messageContainerRef.current.scrollHeight
      );
    }
  };

  // useEffect hook
  useEffect(() => {
    if (socket && roomData && parsedUserData) {
      socket.emit("chat", roomData, parsedUserData.userName);
      socket.on("chat-message", handleChatMessage);
      socket.on("feedback", handleUpdateFeedback);
      socket.on("clients-total", handleClientsTotal);
      return () => {
        socket.off("chat-message", handleChatMessage);
        socket.off("feedback", handleUpdateFeedback);
        socket.off("clients-total", handleClientsTotal);
      };
    }
  }, [socket, roomData, parsedUserData]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, feedback]);

  useEffect(() => {
    if (parsedUserData && roomData) {
      const storedMessages = localStorage.getItem(
        `${parsedUserData.userName}_${roomData}`
      );
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    }
  }, [parsedUserData, roomData]);

  useEffect(() => {
    if (parsedUserData && roomData) {
      const handleBeforeUnload = () => {
        localStorage.setItem(
          `${parsedUserData.userName}_${roomData}`,
          JSON.stringify(messages)
        );
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [parsedUserData, roomData, messages]);

  if (!parsedUserData) {
    return null;
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
        <h2>{roomData}</h2>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleLogout();
          }}>
          Logout
        </Button>
      </Box>
      <Box className="chat-window">
        <Box className="chat-username">
          <span>
            <i className="far fa-user"></i>
          </span>
          <h3 className="username">{parsedUserData.userName}</h3>
        </Box>
        <MessageList
          messages={messages}
          feedback={feedback}
          ref={messageContainerRef}
          userId={parsedUserData._id}
        />
        <MessageForm
          userName={parsedUserData.userName}
          onSendMessage={handleSendMessage}
          onFeedback={handleFeedback}
        />
        <ClientCount total={clientsTotal} />
      </Box>
    </Box>
  );
};

export default Chat;
