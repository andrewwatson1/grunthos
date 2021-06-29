// System
import React from "react";

// Mui
import Box from "@material-ui/core/Box";

// Mothership
import AppContext from "./../../context/AppContext";

// Widgets
import AppHeader from "./../../widgets/appHeader";
import DropHero from "./../../widgets/dropHero";

// Component
export const Home = () => {

  // Wire up
  const app = React.useContext(AppContext);

  // After our first render
  React.useEffect(() => {

    // If we have no drops yet
    if (!app.drops.data) {

      // Load
      app.util.loadDrops();

    }

  });

  // Render
  return (

    <Box>
      <AppHeader />
      <DropHero drop={{}} />
    </Box>

  );

};

// Make it clear
export default Home;