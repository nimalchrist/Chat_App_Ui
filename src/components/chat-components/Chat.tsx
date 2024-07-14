import React, { useCallback, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import {
  ArrowBack,
  KeyboardArrowDown,
  MoreVert,
  Search,
} from "@mui/icons-material";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import ClientCount from "./ClientCount";
import ChatProps from "../../interface/ChatProps";
import ChatSearchField from "./ChatSearchField";
import useChatMessages from "../../hooks/useChatMessages";
import useChatSearch from "../../hooks/useChatSearch";

const Chat: React.FC<ChatProps> = ({ roomName }) => {
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
    searchMode,
    searchTerm,
    searchResults,
    currentSearchIndex,
    handleSearchToggle,
    handleSearchInputChange,
    handleSearchApiTrigger,
    handleNextSearchResult,
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
      <Box className="chat-window">
        <Box className="chat-username">
          <span>
            <i className="far fa-user"></i>
          </span>
          <h3 className="username">{authData.user!.userName}</h3>
          <Box
            sx={{
              alignSelf: "flex-end",
              display: "flex",
              alignItems: "center",
            }}>
            <IconButton onClick={handleSearchToggle}>
              <Search sx={{ fontSize: 26 }} />
            </IconButton>
            <IconButton onClick={() => {}}>
              <MoreVert sx={{ fontSize: 26 }} />
            </IconButton>
          </Box>
          {searchMode && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: "white",
                zIndex: 1,
                boxShadow: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "10px",
              }}>
              <IconButton onClick={handleSearchToggle}>
                <ArrowBack sx={{ fontSize: 26 }} />
              </IconButton>
              <ChatSearchField
                searchTerm={searchTerm}
                handleSearchChange={handleSearchInputChange}
              />
              <IconButton onClick={handleSearchApiTrigger}>
                <Search sx={{ fontSize: 26 }} />
              </IconButton>
              <IconButton onClick={handleNextSearchResult}>
                <KeyboardArrowDown sx={{ fontSize: 26 }} />
              </IconButton>
            </Box>
          )}
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
