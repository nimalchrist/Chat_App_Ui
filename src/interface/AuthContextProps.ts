import UserData from "./UserData";

export default interface AuthContextProps {
  authData: {
    accessToken: string | null;
    refreshToken: string | null;
    user: UserData | null;
  };
  register: (
    userName: string,
    email: string,
    password: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
