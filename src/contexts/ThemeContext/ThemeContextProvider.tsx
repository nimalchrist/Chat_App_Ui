import React, { useState, useMemo } from "react";
import { ThemeProvider as MuiThemeProvider, Theme } from "@mui/material/styles";
import { lightTheme, darkTheme } from "../../utils/theme";
import ThemeContext from "./ThemeContext";
import ThemeContextProviderProps from "../../interface/ThemeContextProviderProps";

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme: Theme = useMemo(
    () => (darkMode ? darkTheme : lightTheme),
    [darkMode]
  );

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
