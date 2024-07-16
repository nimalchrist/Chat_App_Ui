interface ChatSendFieldProps {
  userName: string;
  message: string;
  setMessage: (value: React.SetStateAction<string>) => void;
  onFeedback: (feedback: string) => void;
}
export default ChatSendFieldProps;
