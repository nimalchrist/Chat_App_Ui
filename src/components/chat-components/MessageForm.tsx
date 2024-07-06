import { Button } from "@mui/material";
import React, { useState } from "react";
import MessageFormProps from "../../interface/MessageFormProps";

const MessageForm: React.FC<MessageFormProps> = ({
  userName,
  onSendMessage,
  onFeedback,
}) => {
  const [message, setMessage] = useState<string>("");

  // callback for when the send message button is clicked or enter key is pressed
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
        placeholder="Enter message to send"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          onFeedback(`${userName} is typing...`);
        }}
        onFocus={() => onFeedback(`${userName} is typing...`)}
        onBlur={() => onFeedback("")}
        className="message-input"
      />
      <Button
        type="submit"
        variant="contained"
        color="info"
        className="send-button">
        send
        <span>
          <i className="fas fa-paper-plane"></i>
        </span>
      </Button>
    </form>
  );
};

export default MessageForm;
