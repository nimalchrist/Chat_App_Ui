import { useContext } from "react";
import SnackBarContext from "../contexts/SnackBarContext/SnackBarContext";

// custom hook to simplify the access of scnackbar provider component
const useSnackBar = () => {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export default useSnackBar;
