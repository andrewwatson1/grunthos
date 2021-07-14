// System
import React from "react";

// Mui
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Grid";

// Mothership
import AppContext from "./../../context/AppContext";

// Local styles
const useStyles = makeStyles((theme) => ({

}));

// View
export const MyPoems = () => {

  // Wire up
  const app = React.useContext(AppContext);

  // Classes
  const classes = useStyles();

  // Render
  return (
    <Box mt={4}>

      <Box p={2}>
        <Typography>Need poems here....</Typography>
      </Box>

    </Box>

  );

};

// Make it clear
export default MyPoems;