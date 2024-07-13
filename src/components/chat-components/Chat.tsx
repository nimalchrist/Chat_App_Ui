import React, { useState, useEffect, useRef } from "react";
import { Box, Button, IconButton, TextField } from "@mui/material";
import axios from "axios";
import useSnackBar from "../../hooks/useSnackBar";
import { Search } from "@mui/icons-material";
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
  const { showMessage } = useSnackBar();

  // search functionality
  const [searchMode, setSearchMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Message[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);

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

  // search functionality
  const handleSearchToggle = () => {
    setSearchMode(!searchMode);
    setSearchTerm("");
    setSearchResults([]);
    setCurrentSearchIndex(0);
  };

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() === "") {
      setSearchResults([]);
      return;
    }
    if (roomKey) {
      try {
        const response = await axios.post(
          "http://localhost:4200/api/v1/rooms/search",
          {
            roomId: roomKey,
            searchTerm: e.target.value,
          }
        );
        setSearchResults(response.data);
        setCurrentSearchIndex(0);
      } catch (error: any) {
        if (error.response) {
          showMessage(
            "Something went wrong. Please try again later",
            "warning"
          );
        }
      }
    }
  };

  const scrollToSearchResult = (index: number) => {
    const messageElements = messageContainerRef.current?.children;
    if (messageElements && searchResults[index]) {
      const messageElement = Array.from(messageElements).find(
        (el) =>
          el.textContent &&
          el.textContent.includes(searchResults[index].message)
      );
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleNextSearchResult = () => {
    if (searchResults.length > 0) {
      const nextIndex = (currentSearchIndex + 1) % searchResults.length;
      setCurrentSearchIndex(nextIndex);
      scrollToSearchResult(nextIndex);
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
        <Box>
          <IconButton onClick={handleSearchToggle}>
            <Search />
          </IconButton>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
      {/* search Mode changes */}
      {searchMode && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            margin: "10px auto",
            width: "80%",
          }}>
          <TextField
            fullWidth
            placeholder="Search messages"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button onClick={handleNextSearchResult}>Next</Button>
        </Box>
      )}
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
          currentSearchIndex={currentSearchIndex}
          searchResults={searchResults}
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
