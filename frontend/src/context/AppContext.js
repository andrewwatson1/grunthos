// System
import React from "react";
import { useHistory } from "react-router";

// Mui
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

// Load theme layer
import ThemeWrapper from "./../theme/ThemeWrapper";

// Get the data
import dropData from "./../_static/json/drops";

// Init global App context
export const AppContext = React.createContext();

// Custom UI
const useStyles = makeStyles((theme) => ({

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  closeBtn: {
    display: "block",
    position: "absolute !important",
    top: "0",
    right: "0",
    zIndex: "2"
  }

}));

// Provider for our context
export const AppProvider = props => {

  // Our Context
  const [app, renderApp] = React.useState(false);

  // Local state
  const [loader, setLoader] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);
  const [sysMsg, setSysMsg] = React.useState(false);

  // Classes
  const classes = useStyles();

  // History
  const history = useHistory();

  // After the first render
  React.useEffect(() => {

    // Define the base app object
    const app = {

      // Once authenticated, this becomes { ...AllPropsRecievedFromApiAboutUser}
      user: {},

      // All drop data. Featured, upcoming, new, etc
      drops: {},

      // Tools to interact with app
      util: {}

    };

    // Util: register
    app.util.register = async ({ ...args }) => {

      // Attempt anything that can throw a proper error
      try {

        // Attempt to create user
        const userRequest = await app.util.fetchApiData("/users", {
          body: JSON.stringify({
            username: args.username,
            email: args.email,
            password: args.password
          })
        });

        // If this is serious
        if (userRequest.status >= 500) { throw new Error("Internal server error. Sorry."); }

        // Local
        let userJson = false;

        // Attempt to get user info json, throw custom error if not
        try { userJson = await userRequest.json(); }
        catch { throw new Error("Internal server error. Sorry."); }

        // If there is an error defined in response
        if (userJson.error) { throw new Error(userJson.error); }

        // So far, so good. Now request token
        const tokenRequest = await app.util.fetchApiData("/users/token", {
          body: JSON.stringify({
            username: args.username,
            password: args.password
          })
        });

        // If this is serious
        if (tokenRequest.status >= 500) { throw new Error("Internal server error. Looks like we need jiggle some wires."); }

        // Local
        let tokenJson = false;

        // Attempt to extract json
        try { tokenJson = await tokenRequest.json(); }
        catch { throw new Error("Internal server error. Sorry."); }

        // If there is an error defined in response
        if (tokenJson.error) { throw new Error(tokenJson.error); }

        // No error in json, but still a bad request (some responses send empty json with errors)
        if (!tokenJson.error && !tokenRequest.ok) { throw new Error("Internal server error. No worries. We're on it."); }

        // User (finally)
        const user = {
          ...tokenJson,
          ...userJson
        };

        // Need to sort this out (1 is admin for now?)
        user.acl = user.restricted ? [] : [1];

        // Absorb user
        renderApp(a => {
          a.user = user;
          return { ...a };
        });


      } catch (error) {

        // Clear the "Error:"
        error.name = "";

        // Throw the result
        throw new Error(error.toString());

      }

    };

    // Util: login
    app.util.login = async ({ ...args }) => {

      // Attempt anything that could throw a proper error
      try {

        // Token request
        const tokenRequest = await app.util.fetchApiData("/users/token", {
          body: JSON.stringify({
            username: args.username,
            password: args.password
          })
        });

        // If this is serious
        if (tokenRequest.status >= 500) { throw new Error("Internal server error. Looks like we need jiggle some wires."); }

        // Local
        let tokenJson = false;

        // Attempt to load json from response.
        try { tokenJson = await tokenRequest.json(); }
        catch { throw new Error("Internal server error. Sorry."); }

        // If there is an error defined in response
        if (tokenJson.error) { throw new Error(tokenJson.error); }

        // No error in json, but still a bad request (some responses send empty json with errors)
        if (!tokenJson.error && !tokenRequest.ok) { throw new Error("Internal server error. No worries. We're on it."); }

        // User request
        const userRequest = await app.util.fetchApiData("/users", {
          method: "GET",
          headers: { Authorization: `Bearer ${tokenJson.id}` }
        });

        // If this is serious
        if (userRequest.status >= 500) { throw new Error("Internal server error. Looks like we need jiggle some wires."); }

        // Local
        let userJson = false;

        // Attempt to load json from response.
        try { userJson = await userRequest.json(); }
        catch { throw new Error("Internal server error. Sorry."); }

        // If there is an error defined in response
        if (userJson.error) { throw new Error(userJson.error); }

        // No error in json, but still a bad request (some responses send empty json with errors)
        if (!userJson.error && !userRequest.ok) { throw new Error("Internal server error. No worries. We're on it."); }

        // User, containing everything we've learned
        const user = {
          ...tokenJson,
          ...userJson
        };

        // If we are persistent
        if (args.remember === "yes") { user.remember = true; }

        // Array of keys this user is granted
        user.acl = [];

        // If the user is not restricted
        if (!user.restricted) {

          // Add general member key to user's acls
          user.acl.push("member");

        }


        // Officially absorb user
        renderApp(a => {

          // Update
          a.user = user;

          // If we are persistent, one last thing
          user.remember && a.util.saveSession();

          // Commit
          return { ...a };

        });

        // Failed at some point
      } catch (error) {

        // Clear the "Error:"
        error.name = "";

        // Throw the result
        throw new Error(error.toString());

      }

    };

    // Util: log out
    app.util.logOut = () => {

      // Clear session
      app.util.clearSession();

      // Wipe
      renderApp(a => {
        a.user = {};
        return { ...a };
      });

      // Go home
      history.push("/");

    };

    // Util: save a session
    app.util.saveSession = () => {

      // Attempt to find local user
      window.localStorage.setItem(process.env.SESSION_COOKIE_NAME, JSON.stringify(app.user));

    };

    // Util: load a session
    app.util.loadSession = () => {

      // Attempt to find local user
      let localUser = window.localStorage.getItem(process.env.SESSION_COOKIE_NAME);

      // If we found something
      if (localUser) {

        // Send it back
        return JSON.parse(localUser);

      }

      // Nope
      return false;

    };

    // Util: clear a session
    app.util.clearSession = () => {

      // Clear
      window.localStorage.clear();

    };

    // Util: test
    app.util.isLoggedIn = () => {

      // For now
      return app.user.acl && app.user.acl.find(row => row === "member");

    };

    // Util:validate user against acls
    app.util.validateAcl = requiredAcls => {

      // If the required list is empty, no restriction
      if (requiredAcls.length === 0) { return true; }

      // If we have no acls
      if (app.user.acl === undefined) { app.user.acl = []; }

      // Find where they intersect
      return requiredAcls.filter(value => app.user.acl.includes(value)).length > 0;

    };

    // Util: open a dialog
    app.util.dialog = args => {

      // If args is false
      if (!args) {

        // Update (clear dialog)
        setDialog(d => {

          // If there is a close method attached to the current dialog, fire
          if (d && d.onClose) { d.onClose(); }

          // Update, keeping content for now so it's smooth
          return {
            isOpen: false,
            content: d.content || ""
          };

        });

        // Bail
        return;

      }

      // Update the state
      setDialog(args);

    };

    // Util: load drops
    app.util.loadDrops = async () => {

      // Id
      const dropTypeId = process.env.DROPTYPE_ID;

      // For now
      const data = dropData;

      // If we have some
      if (data) {

        // Absorb
        renderApp(a => {

          // Bring in drops
          a.drops.data = [...data];

          // Commit
          return { ...a };

        });

        return;

      }

      // Try
      try {

        // Get drops
        const dropsRequest = await app.util.fetchApiData(`/drops?droptypes_id=${dropTypeId}`, { method: "GET" });

        // Data
        const dropsData = await dropsRequest.json();

        // Absorb
        renderApp(a => {

          // Bring in drops
          a.drops.data = [...dropsData];

          // Commit
          return { ...a };

        });


      } catch (error) {

        // Clean up
        error.name = "";

        // System feedback
        app.util.sysMsg({
          isOpen: true,
          severity: "error",
          msg: error.toString()
        });

      }

    };

    // Util: get api data
    app.util.fetchApiData = (endpoint, fetchArgs) => {

      /* global process */
      let api_url = process.env.URL_API; // Set in webpack config

      // Send along with all requests
      let defaultFetchArgs = {

        // Custom headers
        headers: {
          "Content-Type": "application/json"
        },

        // Method
        method: "POST"

      };

      // Return native fetch
      return fetch(api_url + endpoint, Object.assign(defaultFetchArgs, fetchArgs));

    };

    // Util: system feedback
    app.util.sysMsg = args => {

      // If args is false
      if (!args) {

        // Update (clear msg)
        setSysMsg(m => {

          // If there is a close method attached to the current
          if (m && m.onClose) { m.onClose(); }

          // Update, keeping content for now so it's smooth
          return {
            isOpen: false,
            severity: m.severity,
            msg: m.msg || ""
          };

        });

        // Bail
        return;

      }

      // Update the state
      setSysMsg(args);

    };

    // Toggle dark mode
    app.util.toggleDarkMode = () => {

      // Render
      renderApp(a => {

        // First time?
        if (typeof app.user.isDarkMode === "undefined") {

          // Make it so
          a.user.isDarkMode = true;

        } else {

          // Do the opposite
          a.user.isDarkMode = !a.user.isDarkMode;

        }

        // Commit
        return { ...a };

      });

    };

    // First, attempt to load local session
    const localSession = app.util.loadSession();

    // If we found something
    if (localSession) {

      // Covert and absorb on this first run
      app.user = localSession;

    }

    // Commit
    renderApp(app);

  }, []);

  // If this is the first run, no need to continue, trigger inital effect
  if (!app) { return null; }

  // Render Provider
  return (
    <AppContext.Provider value={app}>
      <ThemeWrapper>

        {/* View */}
        {props.children}

        {/* Loader */}
        <Backdrop open={loader && loader.isOpen} color="inherit" className={classes.backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>

        {/* Dialog */}
        <Dialog open={dialog && dialog.isOpen} onClose={dialog.onClose} maxWidth="xs" >
          <DialogContent>

            {dialog.content}

            <IconButton aria-label="close" className={classes.closeBtn} onClick={() => app.util.dialog(false)}>
              <CloseIcon />
            </IconButton>

          </DialogContent>
        </Dialog>

        {/* System Messages */}
        <Snackbar open={sysMsg && sysMsg.isOpen} autoHideDuration={6000} onClose={sysMsg.close}>
          <MuiAlert onClose={sysMsg.close} severity={sysMsg.severity}>
            {sysMsg.msg}
          </MuiAlert>
        </Snackbar>

      </ThemeWrapper>
    </AppContext.Provider>
  );

};

// Make it clear
export default AppContext;
