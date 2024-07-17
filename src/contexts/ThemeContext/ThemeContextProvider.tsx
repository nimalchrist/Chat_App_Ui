import React, { useState, useMemo } from "react";
import { ThemeProvider as MuiThemeProvider, Theme } from "@mui/material/styles";
import { lightTheme, darkTheme } from "../../utils/theme";
import ThemeContext from "./ThemeContext";
import ThemeContextProviderProps from "../../interface/ThemeContextProviderProps";

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  // global state variable to keep track of light and dark mode
  const [darkMode, setDarkMode] = useState(false);

  // apply the theme based on the mode
  const theme: Theme = useMemo(
    () => (darkMode ? darkTheme : lightTheme),
    [darkMode]
  );

  // toggler to toggle between the themes
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, theme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
