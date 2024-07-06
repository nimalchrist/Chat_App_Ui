// export default MessageList;
import { forwardRef } from "react";
import moment from "moment";
import MessageListProps from "../../interface/MessageListProps";
import generateColors from "../../utils/generateColors";

const MessageList = forwardRef<HTMLUListElement, MessageListProps>(
  ({ messages, feedback, userId }, ref) => {
    const userIds = Array.from(
      new Set(messages.map((message) => message.userId))
    );
    const userColors = generateColors(userIds.length);
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
              <span
                style={
                  message.userId !== userId
                    ? { color: userColors[userIds.indexOf(message.userId)] }
                    : {}
                }>
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
