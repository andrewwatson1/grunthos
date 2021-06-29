// System
import React from "react";

// Mui
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

// Custom styles
const useStyles = makeStyles((theme) => ({
  poem: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "200px"
  },
  details: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: "200px"
  }
}));

// Widget
export const DropHero = () => {

  // Classes
  const classes = useStyles();

  // State
  const [data, setData] = React.useState({});

  // render
  return (
    <Box>
      <Grid container>

        <Grid item xs={6}>
          <Box className={classes.poem} p={2}>
            {data.poem ? data.poem : <Box className={classes.poemLoader}><CircularProgress /></Box>}
          </Box>
        </Grid>

        <Grid item xs={6}>
          <Box className={classes.details} p={2}>
            {data.details ? data.details : <Box className={classes.detailsLoader}><CircularProgress /></Box>}
          </Box>
        </Grid>

      </Grid>
    </Box>
  );

};

// Make it clear
export default DropHero;