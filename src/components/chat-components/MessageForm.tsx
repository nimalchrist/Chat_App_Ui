import { Button } from "@mui/material";
import React, { useState } from "react";
import MessageFormProps from "../../interface/MessageFormProps";
import ChatSendField from "./ChatSendField";

const MessageForm: React.FC<MessageFormProps> = ({
  userName,
  onSendMessage,
  onFeedback,
}) => {
  // state variable to maintain the current message.
  const [message, setMessage] = useState<string>("");

  // handler to chat send button click
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
      <ChatSendField
        userName={userName}
        message={message}
        setMessage={setMessage}
        onFeedback={onFeedback}
      />
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        sx={{
          fontWeight: "bold",
        }}
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
