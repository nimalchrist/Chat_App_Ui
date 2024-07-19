import { useEffect, useState } from "react";
import Message from "../interface/Message";
import useAuthentication from "./useAuthentication";
import useSocket from "./useSocket";

// custom hook to simplify the chat messages handling in the Chat.tsx component
const useChatMessages = (roomName: string) => {
  const { socket } = useSocket();
  const [roomKey, setRoomKey] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [clientsTotal, setClientsTotal] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const { authData } = useAuthentication();

  // handler for sending message
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

  // handler for feedback
  const handleFeedback = (feedback: string) => {
    if (socket && roomKey) {
      socket.emit("feedback", { feedback, roomId: roomKey });
    }
  };

  // handler for received message
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

  useEffect(() => {
    if (socket && roomName && authData.user) {
      socket.emit("chat", roomName, authData.user._id);
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
        socket.disconnect();
      };
    }
  }, [socket, roomName, authData.user]);

  return {
    authData,
    roomKey,
    messages,
    clientsTotal,
    feedback,
    handleSendMessage,
    handleFeedback,
  };
};

export default useChatMessages;
