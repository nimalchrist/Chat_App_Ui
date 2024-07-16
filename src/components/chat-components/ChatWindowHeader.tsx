import {
  ArrowBack,
  KeyboardArrowDown,
  MoreVert,
  Search,
} from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
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
  const { theme } = useThemeToggle();
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
