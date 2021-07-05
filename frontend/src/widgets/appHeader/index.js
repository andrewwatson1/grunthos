// System
import React from "react";

// Mui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

// Mothership
import AppContext from "./../../context/AppContext";

// Widgets
import LoginDialog from "./../../widgets/loginDialog";

// Custom UI
const useStyles = makeStyles((theme) => ({
  appHeader: {
    marginBottom: "20px"
  },
  title: {
    fontSize: "25px",
    fontWeight: "700",
    flexGrow: 1,
    "& span": {
      display: "block",
      fontSize: "12px",
      fontWeight: "300",
      paddingTop: "5px"
    }
  }
}));

// Widget
export const AppHeader = () => {

  // Classes
  const classes = useStyles();

  // Wire up
  const app = React.useContext(AppContext);

  // Login open event
  const handleLoginClick = () => app.util.dialog({
    isOpen: true,
    content: <LoginDialog />
  });

  // Render
  return (

    <Box className={classes.appHeader}>

      <Container>

        <Box pt={2}>

          <Grid container spacing={2}>

            <Grid item xs={8}>
              <Typography variant="h1" className={classes.title}>
                Vogon Odist <span>A gallery of today&apos;s hottest Vogon talent!</span>
              </Typography>
            </Grid>

            <Grid item xs={4}>

              <Box display="flex" justifyContent="flex-end">

                {
                  // Auth
                  app.util.isLoggedIn()
                    ? <Button size="small" variant="outlined" onClick={() => app.util.logOut()}>Logout</Button>
                    : <Button size="small" disableRipple onClick={handleLoginClick}>Login</Button>

                }

              </Box>

            </Grid>

          </Grid>

        </Box>

      </Container>

    </Box >

  );

};

//Make it clear
export default AppHeader;