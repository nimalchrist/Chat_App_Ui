import { TextField } from "@mui/material";
import ChatSendFieldProps from "../../interface/ChatSendFieldProps";

// customised chat send field component
const ChatSendField: React.FC<ChatSendFieldProps> = ({
  userName,
  message,
  setMessage,
  onFeedback,
}) => {
  return (
    <TextField
      fullWidth
      placeholder="Enter message to send"
      value={message}
      onChange={(e: any) => {
        setMessage(e.target.value);
        onFeedback(`${userName} is typing...`);
      }}
      onFocus={() => onFeedback(`${userName} is typing...`)}
      onBlur={() => onFeedback("")}
      className="message-input"
      variant="outlined"
      // overriding the default mui library colors.
      InputProps={{
        sx: {
          height: 50,
          borderRadius: "4px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray",
          },
        },
      }}
    />
  );
};

export default ChatSendField;
