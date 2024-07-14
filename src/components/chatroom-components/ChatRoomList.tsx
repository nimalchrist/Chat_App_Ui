import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  Typography,
  ListItemButton,
} from "@mui/material";
import { Delete, ExitToApp } from "@mui/icons-material";
import { ChatRoomListProps } from "../../interface/ChatRoomListProps";

const ChatRoomList: React.FC<ChatRoomListProps> = ({
  rooms,
  authData,
  handleDeleteRoom,
  handleLeaveRoom,
  handleViewButtonClick,
}) => {
  return (
    <>
      <Typography variant="h5">Previous Rooms</Typography>
      {rooms.length === 0 ? (
        <Typography variant="h6">No past rooms</Typography>
      ) : (
        <List>
          {rooms.map((room) => (
            <ListItemButton
              key={room.roomId}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <ListItemText
                primary={room.roomName}
                primaryTypographyProps={{
                  fontSize: "18px",
                  color: "#d32f2f",
                  fontWeight: "bold",
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
                      color="primary"
                      variant="text"
                      onClick={() => handleViewButtonClick(room.roomName)}>
                      View room
                    </Button>
                  </>
                )}
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      )}
    </>
  );
};

export default ChatRoomList;
