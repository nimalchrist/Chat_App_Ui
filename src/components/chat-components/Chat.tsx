import React, { useState, useEffect, useRef } from "react";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import ClientCount from "./ClientCount";
import Message from "../../dto/Message";
import useAuthentication from "../../hooks/useAuthentication";
import useSocket from "../../hooks/useSocket";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";
import "../../assets/styles/Chat.css";

interface ChatProps {
  roomId: string | undefined;
}

const Chat: React.FC<ChatProps> = ({ roomId }) => {
  const { socket, setSocket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [clientsTotal, setClientsTotal] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const messageContainerRef = useRef<HTMLUListElement>(null);
  const { logout } = useAuthentication();
  const parsedUserData = useAuthenticatedUser();

  // handlers
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
    socket.emit("message", newMessage, roomId);
  };

  const handleFeedback = (feedback: string) => {
    if (socket && roomId) {
      socket.emit("feedback", { feedback, roomId });
    }
  };

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
    if (roomId) {
      localStorage.setItem(
        `${parsedUserData?.userName}_${roomId}`,
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
    if (socket && roomId) {
      socket.emit("chat", roomId);
      socket.on("chat-message", handleChatMessage);
      socket.on("feedback", handleUpdateFeedback);
      socket.on("clients-total", handleClientsTotal);
      return () => {
        socket.off("chat-message", handleChatMessage);
        socket.off("feedback", handleUpdateFeedback);
        socket.off("clients-total", handleClientsTotal);
      };
    }
  }, [socket, roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, feedback]);

  useEffect(() => {
    if (parsedUserData && roomId) {
      const storedMessages = localStorage.getItem(
        `${parsedUserData.userName}_${roomId}`
      );
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    }
  }, [parsedUserData, roomId]);

  useEffect(() => {
    if (parsedUserData && roomId) {
      const handleBeforeUnload = () => {
        localStorage.setItem(
          `${parsedUserData.userName}_${roomId}`,
          JSON.stringify(messages)
        );
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [parsedUserData, roomId, messages]);

  if (!parsedUserData) {
    return null;
  }
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
