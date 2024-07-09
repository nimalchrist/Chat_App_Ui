import { Navigate, Outlet } from "react-router-dom";
import useAuthentication1 from "../../hooks/useAuthentication";

const ProtectedRoute = () => {
  const { authData } = useAuthentication1();
  if (authData.accessToken === null || authData.refreshToken === null) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
