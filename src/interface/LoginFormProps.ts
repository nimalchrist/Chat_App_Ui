export default interface LoginFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleLoginSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
