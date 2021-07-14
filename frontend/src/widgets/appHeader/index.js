// System
import React from "react";
import { useHistory } from "react-router";

// Mui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// Mothership
import AppContext from "./../../context/AppContext";

// Widgets
import LoginDialog from "./../../widgets/loginDialog";

// Custom UI
const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.grey[800],
    cursor: "pointer",
    fontSize: "90%",
    fontWeight: "700",
    flexGrow: 1,
    "& span": {
      display: "block",
      fontWeight: "300",
      fontSize: "75%"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "125%",
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
      "& span": {
        fontSize: "65%"
      }
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "225%",
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
      "& span": {
        fontSize: "50%"
      }
    }
  }
}));

// Widget
export const AppHeader = () => {

  // Wire up
  const app = React.useContext(AppContext);

  // State
  const [userMenuIsOpen, setUserMenuIsOpen] = React.useState(false);

  // Ref
  const userMenuToggle = React.useRef();

  // Classes
  const classes = useStyles();

  // History
  const history = useHistory();

  // Login open event
  const handleLoginClick = () => app.util.dialog({
    isOpen: true,
    content: <LoginDialog />
  });

  // User menu open event
  const handleUserMenuClick = () => setUserMenuIsOpen(true);

  // User menu close event
  const handleUserMenuClose = () => setUserMenuIsOpen(false);

  // Render
  return (

    <Box className={classes.appHeader}>
      <Container>
        <Grid container alignItems="center">

          <Grid item xs={8}>

            <Typography component="h1" className={classes.title} onClick={() => history.push("/")}>
              Vogon Odist <span>Home to today&apos;s hottest Vogon poets!</span>
            </Typography>

          </Grid>

          <Grid item xs={4}>

            <Box display="flex" justifyContent="flex-end">

              {
                // Auth
                app.util.isLoggedIn()
                  ? <>
                    <IconButton ref={userMenuToggle} aria-label="show-usermenu" onClick={handleUserMenuClick}>
                      <AccountBoxIcon />
                    </IconButton>

                    <Menu
                      id="user-menu"
                      anchorEl={userMenuToggle.current}
                      keepMounted
                      open={userMenuIsOpen}
                      onClose={handleUserMenuClose}
                    >

                      <MenuItem onClick={() => history.push("/account")}>

                        <ListItemIcon>
                          <AccountBoxIcon />
                        </ListItemIcon>

                        <Typography variant="inherit">Account</Typography>

                      </MenuItem>

                      <MenuItem onClick={() => app.util.logOut()}>

                        <ListItemIcon>
                          <ExitToAppIcon fontSize="small" />
                        </ListItemIcon>

                        <Typography variant="inherit">Log out</Typography>

                      </MenuItem>

                    </Menu>
                  </>

                  : <Button disableRipple onClick={handleLoginClick}>Login</Button>

              }

            </Box>

          </Grid>

        </Grid>
      </Container>
    </Box >

  );

};

//Make it clear
export default AppHeader;