// System
import React from "react";

// Mui
import Box from "@material-ui/core/Box";

// Components
import Login from "./Login";
import Register from "./Register";

// Widget
export const LoginModal = () => {

  // State
  const [panel, setPanel] = React.useState("login");

  // Login?
  if (panel === "login") {
    return (
      <Box pb={6}>

        <Login setPanel={setPanel} />

      </Box >
    );
  }

  // Register?
  if (panel === "register") {
    return (
      <Box pb={6}>

        <Register setPanel={setPanel} />

      </Box >
    );
  }

};

// Make it clear
export default LoginModal;