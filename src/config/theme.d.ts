import "@mui/material/styles";

// custom theme on the MUI base theme
declare module "@mui/material/styles" {
  interface TypeBackground {
    chatWindow: string;
    appBar: string;
    senderMessageBubble: string;
    receiverMessageBubble: string;
  }

  // extending the theme interface to include the status
  interface Theme {
    status: {
      danger: string;
    };
  }

  // extending the theme options interface
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
