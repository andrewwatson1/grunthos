// System
import React from "react";

// Mui
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LinearProgress from "@material-ui/core/LinearProgress";

// Mothership
import AppContext from "./../../context/AppContext";

// Util
import { Checkbox } from "@material-ui/core";

// Custom layout
const useStyles = makeStyles(() => ({
  comingSoon: {
    background: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    flexGrow: "1",
    height: "100%",
    width: "100%"
  },
  content: {

  },
  focus: {
    width: "100%",
    height: "auto"
  },
  rowSignUp: {
    "& .MuiTypography-root": {
      fontWeight: "bold"
    }
  }
}));

// Widget
export const Login = ({ setPanel }) => {

  // Classes
  const classes = useStyles();

  // Wire up
  const app = React.useContext(AppContext);

  // State
  const [state, setState] = React.useState({});

  // Node
  const form = React.useRef();

  // Process attempt
  const formSubmit = event => {

    // Intercept
    event.preventDefault();

    // Gather
    const formData = new FormData(form.current);

    // Get specific
    const values = {
      username: formData.get("username").trim(),
      password: formData.get("password").trim(),
      remember: formData.get("remember")
    };

    // If we got nothing
    if (!values.username || !values.password) {

      // Rerender with the error
      setState(s => {
        s.error = "One or more fields missing";
        s.isLoading = false;
        return { ...s };
      });

      // Bail
      return;

    }

    // Render as loading
    setState(s => {
      s.isLoading = true;
      s.error = false;
      return { ...s };
    });

    // Call the login util
    app.util.login({
      username: values.username,
      password: values.password,
      remember: values.remember
    })

      // No issues
      .then(() => {

        // Close the dialog
        app.util.dialog(false);

      })

      // Issues
      .catch((error) => {

        // Clear the prefix
        error.name = "";

        // Render with the bits we need
        setState(s => {
          s.isLoading = false;
          s.error = error.toString();
          return { ...s };
        });

      });

  };

  // Render
  return (
    <>
      <Box>

        <Box textAlign="center" mb={1}>
          <Typography variant="h4" component="p">Log In</Typography>
        </Box>

        <Box textAlign="center" mb={3}>
          <Typography variant="subtitle1" component="p">Please Log In to continue</Typography>
        </Box>

        <Box component="form" onSubmit={formSubmit} ref={form} mb={3}>

          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField name="username" label="Username" variant="outlined" fullWidth required color="secondary" />
            </Grid>

            <Grid item xs={12}>
              <TextField name="password" label="Password" variant="outlined" fullWidth type="password" required color="secondary" />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel control={<Checkbox name="remember" value="yes" />} label="Remember me" />
            </Grid>

            {
              state.error && (
                <Grid item xs={12}>
                  <Alert severity="error">{state.error}</Alert>
                </Grid>
              )
            }

            <Grid item xs={12}>
              {
                state.isLoading

                  ? <Box p={2} minHeight="42px"><LinearProgress /></Box>

                  : <Button size="large" variant="contained" fullWidth type="submit" color="primary" disableElevation style={{ borderRadius: "50px" }} >Log in</Button>
              }
            </Grid>

          </Grid>

        </Box>

      </Box>

      <Grid container>

        <Grid item xs={8} className={classes.rowSignUp}>
          <Typography color="secondary">Don&apos;t have an account?</Typography>
        </Grid>

        <Grid item xs={4} className={classes.rowSignUp}>
          <Box textAlign="right" onClick={() => setPanel("register")}>
            <Typography color="secondary" style={{ cursor: "pointer" }}>Sign up</Typography>
          </Box>
        </Grid>

      </Grid>
    </>);

};

// Make it clear
export default Login;