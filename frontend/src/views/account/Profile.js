// System
import React from "react";

// Mui
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
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
export const Profile = () => {

  // Wire up
  const app = React.useContext(AppContext);

  // Classes
  const classes = useStyles();

  // Local
  const inputChangeHandler = (event) => {

    console.log(event.target.value);

  };

  // Render
  return (
    <Box mt={4}>

      <form className={classes.root} noValidate autoComplete="off">

        <FormControl variant="outlined">
          <InputLabel htmlFor="user-email">Email</InputLabel>
          <OutlinedInput id="user-email" value={app.user.email} onChange={inputChangeHandler} label="Email" />
        </FormControl>

        <Box mt={4}>
          <Button variant="contained" color="secondary" disableElevation>
            Primary
          </Button>
        </Box>

      </form>

    </Box>

  );

};

// Make it clear
export default Profile;