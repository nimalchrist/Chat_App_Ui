import ChatIcon from "@mui/icons-material/Chat";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useThemeToggle from "../../hooks/useThemeToggle";
import SwitchChatProps from "../../interface/SwitchChatProps";

const SwitchChatList: React.FC<SwitchChatProps> = ({
  roomId,
  rooms,
  handleRoomClick,
}) => {
  // theme toggler hook to toggle between dark and light theme
  const { theme } = useThemeToggle();

  // state variable to track the active room
  const [activeRoom, setActiveRoom] = useState<string>(roomId);

  // handler for switch between rooms
  const handleRoomSelection = (roomName: string) => {
    setActiveRoom(roomName);
    handleRoomClick(roomName);
  };

  return (
    <>
      {rooms.map((room, index) => (
        <React.Fragment key={room.roomId}>
          <ListItemButton
            onClick={() => handleRoomSelection(room.roomName)}
            sx={{
              borderRadius: "8px",
              backgroundColor:
                activeRoom === room.roomName
                  ? theme.palette.action.selected
                  : "inherit",
            }}>
            <ListItemIcon>
              <ChatIcon sx={{ color: theme.palette.text.primary }} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  fontSize="18px"
                  color={theme.palette.primary.main}
                  fontWeight="bold">
                  {room.roomName}
                </Typography>
              }
            />
          </ListItemButton>
          {index < rooms.length - 1 && (
            <Divider sx={{ backgroundColor: theme.palette.divider }} />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default SwitchChatList;
