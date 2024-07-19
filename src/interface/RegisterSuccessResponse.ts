type User = {
  _id: string;
  userName: string;
  email: string;
  password: string;
  __v: number;
};
interface RegisterSuccessResponse {
  message: string;
  user: User;
}
export default RegisterSuccessResponse;
