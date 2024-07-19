interface SnackBarContextProps {
  showMessage: (
    message: string,
    severity?: "success" | "error" | "warning" | "info"
  ) => void;
}

export default SnackBarContextProps;
