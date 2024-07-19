import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext/ThemeContext";

// custom hook to simplify the access of Theme Context
const useThemeToggle = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeToggle must be used within a ThemeProvider");
  }
  return context;
};

export default useThemeToggle;
