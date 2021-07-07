// System
import React from "react";

// Mui
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// Mothership
import AppContext from "../context/AppContext";

// Base
const baseTheme = {
  palette: {
    primary: {
      main: "#373632"
    },
    secondary: {
      main: "#d0ba80"
    }
  }
};

// Theme wrapper (Provider)
export const ThemeWrapper = props => {

  // Wire up
  const app = React.useContext(AppContext);

  // State
  const [theme, setTheme] = React.useState({ ...baseTheme });

  // Listen for updates to the user
  React.useEffect(() => {

    if (app.user.isDarkMode === true && theme.palette.type !== "dark") {

      // Set
      setTheme(t => {
        t.palette.type = "dark";
        return { ...t };
      });

    }

    if (app.user.isDarkMode === false && theme.palette.type !== "light") {

      // Set
      setTheme(t => {
        t.palette.type = "light";
        return { ...t };
      });

    }

  }, [app.user.isDarkMode]);

  // Render
  return (
    <ThemeProvider theme={createTheme(theme)}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );

};

// Make it clear
export default ThemeWrapper;