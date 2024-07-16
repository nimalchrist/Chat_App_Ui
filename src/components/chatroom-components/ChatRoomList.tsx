import React from "react";
import {
  List,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  Typography,
  ListItemButton,
  Divider,
} from "@mui/material";
import { Delete, ExitToApp } from "@mui/icons-material";
import { ChatRoomListProps } from "../../interface/ChatRoomListProps";
import useThemeToggle from "../../hooks/useThemeToggle";

const ChatRoomList: React.FC<ChatRoomListProps> = ({
  rooms,
  authData,
  handleDeleteRoom,
  handleLeaveRoom,
  handleViewButtonClick,
}) => {
  const { theme } = useThemeToggle();

  return (
    <>
      <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
        Previous Rooms
      </Typography>
      {rooms.length === 0 ? (
        <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
          No past rooms
        </Typography>
      ) : (
        <List>
          {rooms.map((room, index) => (
            <React.Fragment key={room.roomId}>
              <ListItemButton
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <ListItemText
                  primary={room.roomName}
                  primaryTypographyProps={{
                    fontSize: "18px",
                    color: theme.palette.text.primary,
                    fontWeight: "600",
                  }}
                />
                <ListItemIcon sx={{ display: "flex", alignItems: "center" }}>
                  {authData.user!._id === room.createdBy ? (
                    <>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteRoom(room)}>
                        <Delete />
                      </IconButton>
                      <Button
                        sx={{ ml: 1 }}
                        color="primary"
                        variant="text"
                        onClick={() => handleViewButtonClick(room.roomName)}>
                        View room
                      </Button>
                    </>
                  ) : (
                    <>
                      <IconButton
                        edge="end"
                        aria-label="leave"
                        onClick={() => handleLeaveRoom(room)}>
                        <ExitToApp />
                      </IconButton>
                      <Button
                        sx={{ ml: 1 }}
                        color="secondary"
                        variant="text"
                        onClick={() => handleViewButtonClick(room.roomName)}>
                        View room
                      </Button>
                    </>
                  )}
                </ListItemIcon>
              </ListItemButton>
              {index < rooms.length - 1 && <Divider />}{" "}
              {/* Add Divider except for last item */}
            </React.Fragment>
          ))}
        </List>
      )}
    </>
  );
};

export default ChatRoomList;
