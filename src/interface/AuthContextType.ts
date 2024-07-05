export default interface AuthContextType {
  auth: { accessToken: string | null; refreshToken: string | null };
  login: (email: string, password: string) => Promise<void>;
  register: (
    userName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}
