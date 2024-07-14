import { ListItemButton, ListItemText } from "@mui/material";
import SwitchChatProps from "../../interface/SwitchChatProps";

const SwitchChatList: React.FC<SwitchChatProps> = ({
  rooms,
  handleRoomClick,
}) => {
  return (
    <>
      {rooms.map((room) => (
        <ListItemButton
          key={room.roomId}
          onClick={() => handleRoomClick(room.roomName)}>
          <ListItemText
            primary={room.roomName}
            primaryTypographyProps={{
              fontSize: "18px",
              color: "#1976d2",
              fontWeight: "bold",
            }}
          />
        </ListItemButton>
      ))}
    </>
  );
};

export default SwitchChatList;
