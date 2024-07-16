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
  const { theme } = useThemeToggle();
  const {
    authData,
    roomKey,
    messages,
    clientsTotal,
    feedback,
    handleSendMessage,
    handleFeedback,
  } = useChatMessages(roomName!);

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

  // Event handlers
  const scrollToBottom = useCallback(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo(
        0,
        messageContainerRef.current.scrollHeight
      );
    }
  }, [messageContainerRef]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, feedback, scrollToBottom]);

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
