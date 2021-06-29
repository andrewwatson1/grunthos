// System
import React from "react";

// Mui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

// Mothership
import AppContext from "./../../context/AppContext";

// Widgets
import LoginDialog from "./../../widgets/loginDialog";

// Custom UI
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
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

    <AppBar position="static" color="transparent">
      <Toolbar>

        <Typography variant="h6" className={classes.title}>
          Grunthos
        </Typography>

        <Box>

          {
            // Auth
            app.util.isLoggedIn()
              ? <Button color="inherit" onClick={() => app.util.logOut()}>Logout</Button>
              : <Button disableRipple className={classes.btn} onClick={handleLoginClick}>Login</Button>

          }

        </Box>

      </Toolbar>
    </AppBar>

  );

};

//Make it clear
export default AppHeader;