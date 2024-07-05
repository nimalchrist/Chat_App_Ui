export default interface MessageFormProps {
  userName: string;
  onSendMessage: (message: string) => void;
  onFeedback: (feedback: string) => void;
}
