import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "500px",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <h1>404 not found</h1>
      <h3>
        The page you are looking for is not found. Please go to home page of the
        application.
      </h3>
      <h3>
        By clicking this <Link to="/">Home page</Link>
      </h3>
    </div>
  );
};

export default NoPage;
