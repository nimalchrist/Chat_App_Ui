import { forwardRef } from "react";
import moment from "moment";
import MessageListProps from "../../interface/MessageListProps";

const MessageList = forwardRef<HTMLUListElement, MessageListProps>(
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
