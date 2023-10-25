import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#DA70D6",
    },
    secondary: {
      main: "#CF9FFF",
    },
    background: {
      default: "#CBC3E3",
      paper: "#C3B1E1", 
    },
    text: {
      primary: "#301934", 
      secondary: "#666", 
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif", 
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      margin: "1rem 0",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold",
      margin: "1rem 0",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none", 
        fontWeight: "bold",
      },
    },
    MuiTextField: {
      root: {
        margin: "1rem 0",
      },
    },
  },
});

export default theme;
