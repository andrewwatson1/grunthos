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
import Checkbox from "@material-ui/core/Checkbox";

// Mothership
import AppContext from "./../../context/AppContext";

// Custom layout
const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.dark,
    fontSize: "150%",
    fontWeight: "600",
    marginBottom: "0"
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

        <Box>
          <Typography component="h2" className={classes.title}>Vogon Odist</Typography>
        </Box>

        <Box mb={5}>
          <Typography component="p" className={classes.subTitle}>Please log in to continue</Typography>
        </Box>

        <Box component="form" onSubmit={formSubmit} ref={form} mb={5}>

          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField name="username" label="Username" variant="outlined" fullWidth required />
            </Grid>

            <Grid item xs={12}>
              <TextField name="password" label="Password" variant="outlined" fullWidth type="password" required />
            </Grid>

            <Grid item xs={6}>
              <Box pl={1}>
                <FormControlLabel control={<Checkbox name="remember" value="yes" color="primary" />} label={<Typography variant="body2">Remember me</Typography>} />
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box>
                {
                  state.isLoading
                    ? <Box p={2} minHeight="42px"><LinearProgress /></Box>
                    : <Button size="large" variant="contained" color="primary" fullWidth type="submit">Log in</Button>
                }
              </Box>
            </Grid>

            {
              state.error && (
                <Grid item xs={12}>
                  <Alert severity="error">{state.error}</Alert>
                </Grid>
              )
            }


          </Grid>

        </Box>

      </Box>

      <Grid container>

        <Grid item xs={8}>
          <Typography>Don&apos;t have an account?</Typography>
        </Grid>

        <Grid item xs={4}>
          <Box textAlign="right" onClick={() => setPanel("register")}>
            <Typography color="primary" style={{ cursor: "pointer", fontWeight: "600" }}>Sign up</Typography>
          </Box>
        </Grid>

      </Grid>
    </>);

};

// Make it clear
export default Login;