import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    chatWindow: string;
    appBar: string;
    senderMessageBubble: string;
    receiverMessageBubble: string;
  }

  interface Theme {
    status: {
      danger: string;
    };
  }

  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
