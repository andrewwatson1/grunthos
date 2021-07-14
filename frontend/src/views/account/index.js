// System
import React from "react";

// Mui
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// Local styles
const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "150%",
    fontWeight: "600"
  }
}));

// Widgets
import AppHeader from "./../../widgets/appHeader";

// Modules
import Profile from "./Profile";

// View
export const Account = () => {

  // State
  const [activeTab, setActiveTab] = React.useState(0);

  // Classes
  const classes = useStyles();

  // Render
  return (
    <>

      <AppHeader />

      <Container>

        <Box pt={2} pb={2}>
          <Typography variant="h2" className={classes.title}>Account</Typography>
        </Box>

        <Box>

          <AppBar position="static" color="primary">
            <Tabs value={activeTab} onChange={(event, newValue) => setActiveTab(newValue)} aria-label="Account Options">
              <Tab label="Profile" id="account-tabs-0" />
            </Tabs>
          </AppBar>

          <Box role="tabpanel" hidden={activeTab !== 0} id={"account-tabpanel-0"} aria-labelledby={"account-tabs-0"}>
            {activeTab === 0 && <Profile />}
          </Box>

        </Box>

      </Container>

    </>
  );

};

// Make it clear
export default Account;