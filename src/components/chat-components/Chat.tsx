import React, { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import ClientCount from "./ClientCount";
import Message from "../../dto/Message";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../../contexts/AuthContext/useAuthentication";
import useSocket from "../../contexts/SocketContext/useSocket";

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const { socket, setSocket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [clientsTotal, setClientsTotal] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [room, setRoom] = useState<string>("sampleroom");
  const messageContainerRef = useRef<HTMLUListElement>(null);
  const { logout } = useAuthentication();

  const userData = localStorage.getItem("authData");
  if (!userData) {
    navigate("/not_authorised_to_view_this_page");
  }
  const parsedUserData = JSON.parse(userData!);

  // handlers
  const handleSendMessage = (message: string) => {
    if (!socket) {
      console.error("Socket is not initialized");
      return;
    }
    const newMessage: Message = {
      name: parsedUserData.userName,
      message,
      dateTime: new Date(),
      userId: parsedUserData._id,
    };
    console.log("sending message", newMessage);
    socket.emit("message", newMessage, room);
  };

  const handleFeedback = (feedback: string) => {
    socket?.emit("feedback", { feedback, room });
  };

  const handleChatMessage = (receivedMessage: Message) => {
    console.log("received message: ", receivedMessage);

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
  

  useEffect(() => {
    if (socket) {
      socket.emit("chat", room);
      socket.on("chat-message", handleChatMessage);
      socket.on("feedback", handleUpdateFeedback);
      socket.on("clients-total", handleClientsTotal);
      return () => {
        console.log("Cleaning up event listeners");
        socket.off("chat-message", handleChatMessage);
        socket.off("feedback", handleUpdateFeedback);
        socket.off("clients-total", handleClientsTotal);
      };
    }
  }, [socket, room]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, feedback]);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "350px" }}>
      <div style={{ alignSelf: "flex-end" }}>
        <button
          style={{ outline: "none", padding: "10px 20px", margin: "20px 0px" }}
          onClick={() => {
            handleLogout();
          }}>
          Logout
        </button>
      </div>
      <div className="chat">
        <div className="name">
          <span>
            <i className="far fa-user"></i>
          </span>
          <h3 className="name-input">{parsedUserData.userName}</h3>
        </div>
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
      </div>
    </div>
  );
};

export default Chat;
