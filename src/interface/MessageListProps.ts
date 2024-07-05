import Message from "./Message";

export default interface MessageListProps {
  messages: Message[];
  feedback: string;
  userId: string;
}
