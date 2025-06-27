import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "./store/slices/authSlice";
import AppRoutes from "./routes/Routes";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useState, useMemo } from "react";
import type { PaletteMode } from "@mui/material";

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#1976d2",
          },
        },
      }),
    [mode]
  );

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes mode={mode} setMode={setMode} />
    </ThemeProvider>
  );
}

export default App;
