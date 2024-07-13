import { TextField } from "@mui/material";
import ChatSearchFieldProps from "../../interface/ChatSearchFieldProps";
import React from "react";

const ChatSearchField: React.FC<ChatSearchFieldProps> = ({
  searchTerm,
  handleSearchChange,
}) => {
  return (
    <TextField
      fullWidth
      placeholder="Search messages"
      value={searchTerm}
      onChange={handleSearchChange}
      variant="standard"
      InputProps={{
        disableUnderline: true,
        sx: {
          height: 50,
        },
      }}
      sx={{
        "& .MuiInputBase-root": {
          backgroundColor: "transparent",
        },
        "& .MuiInputBase-input::placeholder": {
          color: "rgba(0, 0, 0, 0.5)",
        },
      }}
    />
  );
};
export default ChatSearchField;
