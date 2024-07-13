import { useParams } from "react-router-dom";
import Chat from "../components/chat-components/Chat";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import "../assets/styles/Chat.css";
import CustomAppBar from "../components/appbar-components/CustomAppBar";

const ChatPage = () => {
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <>
      <CustomAppBar title={roomId!} />
      <Box className="chat-component">
        <Box className="switch-rooms-list">
          <Typography
            variant="h2"
            sx={{ fontSize: "26px", fontWeight: "bold", my: "16px" }}>
            Switch Rooms
          </Typography>
          {/* TODO: list cards needs to be rendered */}
          <List>
            <ListItem>
              <ListItemText primary="1" />
            </ListItem>
            <ListItem>
              <ListItemText primary="2" />
            </ListItem>
            <ListItem>
              <ListItemText primary="3" />
            </ListItem>
          </List>
        </Box>
        <Chat roomName={roomId} />
      </Box>
    </>
  );
};
export default ChatPage;
