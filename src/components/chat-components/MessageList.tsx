import React, { forwardRef } from "react";
import moment from "moment";
import Message from "../../dto/Message";

interface Props {
  messages: Message[];
  feedback: string;
  userId: string;
}

const MessageList = forwardRef<HTMLUListElement, Props>(
  ({ messages, feedback, userId }, ref) => {
    return (
      <ul className="message-container" ref={ref}>
        {messages.map((message, index) => (
          <li
            key={index}
            className={
              message.userId === userId ? "message-right" : "message-left"
            }>
            <p className="message">
              {message.message}
              <span>
                {message.name} | {moment(message.dateTime).fromNow(true)}
              </span>
            </p>
          </li>
        ))}
        {feedback && (
          <li className="message-feedback">
            <p className="feedback">{feedback}</p>
          </li>
        )}
      </ul>
    );
  }
);

export default MessageList;
