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

    // Find random drop to be featured
    const featuredDrop = app.drops.data[0].grunthos_drop;

    // Set our state and render
    setState({
      featuredDrop
    });

  }, [app.drops, app.drops.data]);

  // Render
  return (

    <>

      <AppHeader />

      <DropHero drop={state.featuredDrop} />

    </>

  );

};

// Make it clear
export default Home;