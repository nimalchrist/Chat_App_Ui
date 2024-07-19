import { createTheme } from "@mui/material/styles";

const commonSettings = {
  typography: {
    fontFamily: "Open Sans, sans-serif",
  },
  palette: {
    primary: {
      main: "#e47911",
    },
    secondary: {
      main: "#ffd814",
    },
  },
};

// Light theme colors
const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    ...commonSettings.palette,
    mode: "light",
    background: {
      default: "#ffffff", // primary background
      paper: "#fcfcfc", // additional background
      chatWindow: "#e6e6e6", // secondary background
      appBar: "#232f3e", // appbar background
      senderMessageBubble: "#111111", // sender message bubble
      receiverMessageBubble: "#f6f6f6", // receiver message bubble
    },
    text: {
      primary: "#000000",
      secondary: "#007185",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffd814",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffd814",
          },
        },
        input: {
          "&::placeholder": {
            color: "#000000", // Placeholder color
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#000000", // Label color
          "&.Mui-focused": {
            color: "#000000", // Focused label color
          },
        },
      },
    },
  },
});

// Dark theme colors
const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    ...commonSettings.palette,
    mode: "dark",
    background: {
      default: "#111111", // primary background
      paper: "#232f3e", // additional background
      chatWindow: "#3a3d44", // secondary background
      appBar: "#232f3e", // appbar background
      senderMessageBubble: "#383c49", // sender message bubble
      receiverMessageBubble: "#ffd814", // receiver message bubble
    },
    text: {
      primary: "#ffffff",
      secondary: "#007185",
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffd814",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffd814",
          },
        },
        input: {
          "&::placeholder": {
            color: "#ffffff", // Placeholder color for dark theme
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#ffffff", // Label color for dark theme
          "&.Mui-focused": {
            color: "#ffffff", // Focused label color for dark theme
          },
        },
      },
    },
  },
});

export { lightTheme, darkTheme };
