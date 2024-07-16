import {
  ArrowBack,
  KeyboardArrowDown,
  MoreVert,
  Search,
} from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useDropDown from "../../hooks/useDropDown";
import useThemeToggle from "../../hooks/useThemeToggle";
import ChatWindowHeaderProps from "../../interface/ChatWindowHeaderProps";
import ChatSearchField from "./ChatSearchField";

const ChatWindowHeader: React.FC<ChatWindowHeaderProps> = ({
  authData,
  searchTerm,
  searchMode,
  handleSearchToggle,
  handleSearchInputChange,
  handleSearchApiTrigger,
  handleNextSearchResult,
}) => {
  const navigate = useNavigate();
  const { theme } = useThemeToggle();
  const { openMenu } = useDropDown();

  const handleLeaveRoom = () => {
    navigate("/home", { replace: true });
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    openMenu(event, [
      {
        label: "Leave Room",
        onClick: handleLeaveRoom,
      },
    ]);
  };

  return (
    <Box className="chat-username" sx={{ color: theme.palette.text.primary }}>
      <span>
        <i className="far fa-user"></i>
      </span>
      <Typography
        variant="body1"
        sx={{ color: theme.palette.text.primary }}
        className="username">
        {authData.user!.userName}
      </Typography>
      <Box
        sx={{
          alignSelf: "flex-end",
          display: "flex",
          alignItems: "center",
        }}>
        <IconButton onClick={handleSearchToggle}>
          <Search sx={{ fontSize: 26 }} />
        </IconButton>
        <IconButton onClick={handleMenuOpen}>
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
            backgroundColor: theme.palette.background.chatWindow,
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
  );
};

export default ChatWindowHeader;
