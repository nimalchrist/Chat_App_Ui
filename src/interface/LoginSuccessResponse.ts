type User = {
  _id: string;
  userName: string;
  email: string;
  password: string;
  __v: number;
};
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
export default LoginResponse;
