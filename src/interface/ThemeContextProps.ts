import { Theme } from "@mui/material/styles";

interface ThemeContextProps {
  darkMode: boolean;
  toggleTheme: () => void;
  theme: Theme;
}
export default ThemeContextProps;
