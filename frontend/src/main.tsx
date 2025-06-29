import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./i18n"; // make sure you import i18n setup

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import "./index.css";

// Get language direction
const language = localStorage.getItem("i18nextLng") || "en";
const direction = language === "ar" ? "rtl" : "ltr";

// Set body direction
document.body.dir = direction;

// Create emotion cache with RTL plugin
const cacheRtl = createCache({
  key: direction === "rtl" ? "muirtl" : "mui",
  stylisPlugins: direction === "rtl" ? [prefixer, rtlPlugin] : [],
});

// MUI theme setup
const theme = createTheme({
  direction,
  palette: {
    mode: "light", // or dark if preferred
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  </React.StrictMode>
);
