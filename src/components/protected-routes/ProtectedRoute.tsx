import {  Outlet } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import NoPage from "../../pages/NoPage";

const ProtectedRoute = () => {
  const { authData } = useAuthentication();

  return( authData.accessToken !== null )? <Outlet /> : <NoPage/>;
};
export default ProtectedRoute;
