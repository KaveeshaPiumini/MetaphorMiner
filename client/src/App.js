import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import Home from "./pages/Home";

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Home />
    </ThemeProvider>
  );
}

export default App;
