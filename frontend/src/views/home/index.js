// System
import React from "react";

// Mui
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

// Mothership
import AppContext from "./../../context/AppContext";

// Widgets
import AppHeader from "./../../widgets/appHeader";
import DropHero from "./../../widgets/dropHero";

// Component
export const Home = () => {

  // Wire up
  const app = React.useContext(AppContext);

  // State
  const [state, setState] = React.useState({
    featuredDrop: false,
    secondaryDrop: false
  });

  // After our first render and if Drops change
  React.useEffect(() => {

    // If we have no drops yet
    if (!app.drops.data) {

      // Load
      app.util.loadDrops();

      // Bail for now
      return;

    }

    // Set our state and render
    setState({
      featuredDrop: app.drops.data[0],
      secondaryDrop: app.drops.data[1]
    });

  }, [app.drops, app.drops.data]);

  // Render
  return (

    <Box>
      <AppHeader />
      <Container>

        <Box p={2}>
          <DropHero drop={state.featuredDrop} />
        </Box>

        <Box p={2}>
          <DropHero drop={state.secondaryDrop} />
        </Box>

      </Container>

    </Box>

  );

};

// Make it clear
export default Home;