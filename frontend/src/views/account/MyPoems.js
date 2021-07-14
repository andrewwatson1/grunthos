// System
import React from "react";

// Mui
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";

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
    <Box mt={2}>

      <Box textAlign="right" mb={3}>
        <Button
          startIcon={<CreateIcon />}
          variant="contained"
          color="secondary">Compose</Button>
      </Box>

    </Box>

  );

};

// Make it clear
export default MyPoems;