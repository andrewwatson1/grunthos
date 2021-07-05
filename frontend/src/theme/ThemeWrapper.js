// System
import React, { useContext, useEffect, useState } from "react";

// Mothership 
import AppContext from "../context/AppContext";

// Mui
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

// Local 
const baseThemeOptions = {
  palette: {
    primary: {
      main: "#d0ba80"
    },
    secondary: {
      main: "#1f5ca6"
    }
  },
  typography: {
    button: {
      //textTransform: "none"
    }
  }
};

// Theme wrapper (Provider)
export const ThemeWrapper = props => {

  // Wire up
  const app = useContext(AppContext);

  // State
  const [theme, setTheme] = useState(createMuiTheme(baseThemeOptions));

  // Monitor isDarkMode
  useEffect(() => {

    // Simple toggle
    app.isDarkMode
      ? baseThemeOptions.palette.type = "dark"
      : baseThemeOptions.palette.type = "light";

    // Make it so
    setTheme(createMuiTheme(baseThemeOptions));

  }, [app.isDarkMode]);

  // Render
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );

};

// Make it clear
export default ThemeWrapper;