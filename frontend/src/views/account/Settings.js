// System
import React from "react";

// Mui
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Mothership
import AppContext from "./../../context/AppContext";

// Local styles
const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "135%",
    fontWeight: "600"
  }
}));

// View
export const Settings = () => {

  // Wire up
  const app = React.useContext(AppContext);

  // Classes
  const classes = useStyles();

  // Render
  return (
    <Box mt={4}>

      <form noValidate autoComplete="off">

        <Box p={2}>
          <TextField name="username" label="Username" variant="outlined" fullWidth required />
        </Box>

        <Box p={2}>
          <TextField name="email" label="Email Address" variant="outlined" fullWidth required />
        </Box>

        <Box p={2}>
          <Grid container spacing={2}>

            <Grid item xs={6}>
              <TextField name="password" label="Password" variant="outlined" fullWidth type="password" />
            </Grid>

            <Grid item xs={6}>
              <TextField name="passwordConfirm" label="Confirm Password" variant="outlined" fullWidth type="password" required />
            </Grid>

          </Grid>
        </Box>

        <Box mt={2} p={2}>
          <Button variant="contained" color="secondary" disableElevation>
            Save
          </Button>
        </Box>

      </form>

    </Box>

  );

};

// Make it clear
export default Settings;