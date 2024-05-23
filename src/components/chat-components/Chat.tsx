import React, { useState, useEffect, useRef } from "react";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import ClientCount from "./ClientCount";
import Message from "../../dto/Message";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../../contexts/AuthContext/useAuthentication";
import useSocket from "../../contexts/SocketContext/useSocket";
interface UserData {
  userName: string;
  email: string;
  password: string;
  _id: string;
  __v: number;
}

const Chat: React.FC = () => {
  const navigate = useNavigate();
  const { socket, setSocket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [clientsTotal, setClientsTotal] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [room, setRoom] = useState<string>("sampleroom");
  const messageContainerRef = useRef<HTMLUListElement>(null);
  const { logout } = useAuthentication();
  const [parsedUserData, setParsedUserData] = useState<UserData | null>(null);

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
    socket.emit("message", newMessage, room);
  };

  const handleFeedback = (feedback: string) => {
    socket?.emit("feedback", { feedback, room });
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
    localStorage.setItem(
      `${parsedUserData?.userName}_${room}`,
      JSON.stringify(messages)
    );
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
    const data: string | null = localStorage.getItem("authData");

    if (!data) {
      navigate("/");
      return;
    }
    try {
      const parsedData: UserData = JSON.parse(data);
      setParsedUserData(parsedData);
    } catch (error) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (socket) {
      socket.emit("chat", room);
      socket.on("chat-message", handleChatMessage);
      socket.on("feedback", handleUpdateFeedback);
      socket.on("clients-total", handleClientsTotal);
      return () => {
        socket.off("chat-message", handleChatMessage);
        socket.off("feedback", handleUpdateFeedback);
        socket.off("clients-total", handleClientsTotal);
      };
    }
  }, [socket, room]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, feedback]);

  useEffect(() => {
    if (parsedUserData && room) {
      const storedMessages = localStorage.getItem(
        `${parsedUserData.userName}_${room}`
      );
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    }
  }, [parsedUserData, room]);

  useEffect(() => {
    if (parsedUserData && room) {
      const handleBeforeUnload = () => {
        localStorage.setItem(
          `${parsedUserData.userName}_${room}`,
          JSON.stringify(messages)
        );
      };
      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [parsedUserData, room, messages]);

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
