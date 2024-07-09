import React, { useState, useEffect, useRef } from "react";
import { Box, Button } from "@mui/material";
import useAuthentication1 from "../../hooks/useAuthentication";
import useSocket from "../../hooks/useSocket";
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
  const { authData, logout } = useAuthentication1();

  // event handlers
  // callback for when the message is sent
  const handleSendMessage = (message: string) => {
    if (!socket) {
      return;
    }
    const newMessage: Message = {
      name: authData.user!.userName,
      message,
      dateTime: new Date(),
      userId: authData.user!._id,
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

  // state handlers
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
    // if (roomData) {
    //   localStorage.setItem(
    //     `${authData.user!.userName}_${roomData}`,
    //     JSON.stringify(messages)
    //   );
    // }
    await logout();
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
    if (socket && roomData) {
      socket.emit("chat", roomData, authData.user!.userName);
      socket.on("chat-message", handleChatMessage);
      socket.on("feedback", handleUpdateFeedback);
      socket.on("clients-total", handleClientsTotal);
      return () => {
        socket.off("chat-message", handleChatMessage);
        socket.off("feedback", handleUpdateFeedback);
        socket.off("clients-total", handleClientsTotal);
      };
    }
  }, [socket, roomData]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, feedback]);

  // useEffect(() => {
  //   if (roomData) {
  //     const storedMessages = localStorage.getItem(
  //       `${authData.user!.userName}_${roomData}`
  //     );
  //     if (storedMessages) {
  //       setMessages(JSON.parse(storedMessages));
  //     }
  //   }
  // }, [roomData]);

  // useEffect(() => {
  //   if (roomData) {
  //     const handleBeforeUnload = () => {
  //       localStorage.setItem(
  //         `${authData.user!.userName}_${roomData}`,
  //         JSON.stringify(messages)
  //       );
  //     };
  //     window.addEventListener("beforeunload", handleBeforeUnload);
  //     return () => {
  //       window.removeEventListener("beforeunload", handleBeforeUnload);
  //     };
  //   }
  // }, [roomData, messages]);
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
