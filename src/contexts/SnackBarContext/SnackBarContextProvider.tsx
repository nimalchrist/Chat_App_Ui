import { Alert, Snackbar } from "@mui/material";
import { ReactNode, useState } from "react";
import SnackBarContext from "./SnackBarContext";

const SnackBarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbar, setSnackbar] = useState<{
    message: string;
    severity: "success" | "error" | "warning" | "info";
    open: boolean;
  }>({
    message: "",
    severity: "info",
    open: false,
  });

  const showMessage = (
    message: string,
    severity: "success" | "error" | "warning" | "info" = "info"
  ) => {
    setSnackbar({ message, severity, open: true });
  };

  const handleClose = () => {
    setSnackbar((prev: any) => ({ ...prev, open: false }));
  };

  return (
    <SnackBarContext.Provider value={{ showMessage }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
};

export default SnackBarProvider;
