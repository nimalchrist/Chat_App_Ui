import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        textAlign: "center",
      }}>
      <h1>404 Not Found</h1>
      <h3>
        The page you are looking for is not found. Please go to the home page of
        the application.
      </h3>
      <h3>
        By clicking this <Link to="/">Home page</Link>
      </h3>
    </Box>
  );
};

export default NotFoundPage;
