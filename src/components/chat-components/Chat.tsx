import { Box } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import useChatMessages from "../../hooks/useChatMessages";
import useChatSearch from "../../hooks/useChatSearch";
import useThemeToggle from "../../hooks/useThemeToggle";
import ChatProps from "../../interface/ChatProps";
import ChatWindowHeader from "./ChatWindowHeader";
import ClientCount from "./ClientCount";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";

const Chat: React.FC<ChatProps> = ({ roomName }) => {
  // theme toggler hook to toggle between dark and light theme
  const { theme } = useThemeToggle();

  // chat messages hook to handle all the functionalities of the chat sending receiving activities
  const {
    authData,
    roomKey,
    messages,
    clientsTotal,
    feedback,
    handleSendMessage,
    handleFeedback,
  } = useChatMessages(roomName!);

  // chat search hook to provide the chat history searching functionality
  const {
    searchTerm,
    searchMode,
    searchResults,
    currentSearchIndex,
    handleNextSearchResult,
    handleSearchApiTrigger,
    handleSearchInputChange,
    handleSearchToggle,
    messageContainerRef,
  } = useChatSearch(roomKey!);

  const scrollToBottom = useCallback(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo(
        0,
        messageContainerRef.current.scrollHeight
      );
    }
  }, [messageContainerRef]);

  // useEffect hook to provide the chat scrolling functionality
  useEffect(() => {
    scrollToBottom();
  }, [messages, feedback, scrollToBottom]);

  // if authData still not set
  if (!authData.user) {
    return <div>Loading...</div>;
  }

  return (
    <Box className="chat-container">
      <Box
        className="chat-window"
        sx={{ backgroundColor: theme.palette.background.chatWindow }}>
        <ChatWindowHeader
          authData={authData}
          searchMode={searchMode}
          searchTerm={searchTerm}
          handleSearchToggle={handleSearchToggle}
          handleNextSearchResult={handleNextSearchResult}
          handleSearchApiTrigger={handleSearchApiTrigger}
          handleSearchInputChange={handleSearchInputChange}
        />
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
