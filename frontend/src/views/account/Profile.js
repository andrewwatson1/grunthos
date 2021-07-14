// System
import React from "react";

// Mui
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Mothership
import AppContext from "./../../context/AppContext";

// Local styles
const useStyles = makeStyles((theme) => ({
  fileUpload: {
    display: "none"
  },
  imgWrapper: {
    "& img": {
      maxWidth: "100%",
      height: "auto"
    }
  }
}));

// View
export const Profile = () => {

  // Wire up
  const app = React.useContext(AppContext);

  // Classes
  const classes = useStyles();

  // Render
  return (
    <Box mt={4}>

      <form noValidate autoComplete="off">

        <Box p={2}>
          <TextField name="vogonname" label="Vogon name" variant="outlined" fullWidth required />
        </Box>

        <Box p={2}>

          <Grid container>

            <Grid item xs={5}>

              <Typography variant="subtitle2">Picture</Typography>

              <Typography variant="body2" gutterBottom>Vogons are required to have an profile picture, displayed along side of your masterpieces.</Typography>

              <Box mt={1}>
                <input
                  accept="image/*"
                  className={classes.fileUpload}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span">
                    Upload
                  </Button>
                </label>
              </Box>

            </Grid>

            <Grid item xs={7}>

              <Typography variant="overline">Current Image</Typography>

              <Box className={classes.imgWrapper}>
                <img src="/images/poets/default.png" alt="No image uploaded" width="460px" height="700px" />
              </Box>

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
export default Profile;