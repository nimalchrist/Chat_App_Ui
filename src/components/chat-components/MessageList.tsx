import { forwardRef } from "react";
import moment from "moment";
import MessageListProps from "../../interface/MessageListProps";
import generateColors from "../../utils/generateColors";
import Theme from "../../utils/Theme";

const MessageList = forwardRef<HTMLUListElement, MessageListProps>(
  ({ messages, feedback, userId, currentSearchIndex, searchResults }, ref) => {
    // Get the unique userId's
    const userIds = Array.from(
      new Set(messages.map((message) => message.userId))
    );

    // Generate colors for the number of users
    const userColors = generateColors(userIds.length, Theme.Light);

    return (
      <ul className="message-container" ref={ref}>
        {messages.map((message, index) => {
          // Check if the current message is part of the search results and is the current search result
          const isCurrentSearchResult =
            searchResults[currentSearchIndex] &&
            searchResults[currentSearchIndex].message === message.message;
          return (
            <li
              key={index}
              // Apply different classes based on whether the message is from the current user
              className={`${
                message.userId === userId ? "message-right" : "message-left"
              } ${isCurrentSearchResult ? "highlighted" : ""}`}>
              <p className="message">
                {message.message}
                <span
                  // If the message is not from the user set the color style
                  style={
                    message.userId !== userId
                      ? { color: userColors[userIds.indexOf(message.userId)] }
                      : {}
                  }>
                  {message.name} | {moment(message.dateTime).fromNow(true)}
                </span>
              </p>
            </li>
          );
        })}
        {feedback && (
          // If feedback is provided, render it as a special <li> element
          <li className="message-feedback">
            <p className="feedback">{feedback}</p>
          </li>
        )}
      </ul>
    );
  }
);

export default MessageList;
