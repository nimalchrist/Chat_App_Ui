import React, { useState } from "react";

interface Props {
  userName: string;
  onSendMessage: (message: string) => void;
  onFeedback: (feedback: string) => void;
}

const MessageForm: React.FC<Props> = ({
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
      <div className="v-divider"></div>
      <button type="submit" className="send-button">
        send{" "}
        <span>
          <i className="fas fa-paper-plane"></i>
        </span>
      </button>
    </form>
  );
};

export default MessageForm;
