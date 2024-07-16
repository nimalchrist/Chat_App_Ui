import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import AppRouter from "./routes/AppRouter";
import useThemeToggle from "./hooks/useThemeToggle";
import ThemeContextProvider from "./contexts/ThemeContext/ThemeContextProvider";
import "./index.css";

const Root: React.FC = () => {
  const { darkMode } = useThemeToggle();

  useEffect(() => {
    const body = document.body;
    body.classList.toggle("dark-mode", darkMode);
    body.classList.toggle("light-mode", !darkMode);
  }, [darkMode]);

  return <AppRouter />;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeContextProvider>
    <Root />
  </ThemeContextProvider>
);

reportWebVitals();
