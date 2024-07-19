import { Outlet } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import NoPage from "../../pages/NoPage";

// used to protect the pages from unauthorised access
const ProtectedRoute = () => {
  // custom hook to provide the authentication related service
  const { authData } = useAuthentication();

  return authData.accessToken !== null ? <Outlet /> : <NoPage />;
};
export default ProtectedRoute;
