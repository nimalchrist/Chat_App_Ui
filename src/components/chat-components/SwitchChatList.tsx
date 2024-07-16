import React, { useState } from "react";
import {
  ListItemButton,
  ListItemText,
  Divider,
  ListItemIcon,
  Typography,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SwitchChatProps from "../../interface/SwitchChatProps";
import useThemeToggle from "../../hooks/useThemeToggle";

const SwitchChatList: React.FC<SwitchChatProps> = ({
  roomId,
  rooms,
  handleRoomClick,
}) => {
  const { theme } = useThemeToggle();
  const [activeRoom, setActiveRoom] = useState<string>(roomId);

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
