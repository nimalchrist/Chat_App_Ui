import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import MessageFormProps from "../../interface/MessageFormProps";

const MessageForm: React.FC<MessageFormProps> = ({
  userName,
  onSendMessage,
  onFeedback,
}) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      onFeedback("");
    }
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          onFeedback(`${userName} is typing...`);
        }}
        onFocus={() => onFeedback(`${userName} is typing...`)}
        onBlur={() => onFeedback("")}
        className="message-input"
      />
      <Box className="v-divider"></Box>
      <Button type="submit" className="send-button">
        send{" "}
        <span>
          <i className="fas fa-paper-plane"></i>
        </span>
      </Button>
    </form>
  );
};

export default MessageForm;
