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
import Checkbox from "@material-ui/core/Checkbox";

import LinearProgress from "@material-ui/core/LinearProgress";

// Mothership
import AppContext from "./../../context/AppContext";

// Custom layout
const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.dark,
    fontSize: "150%",
    fontWeight: "600"
  },
  iAmVogon: {
    marginTop: theme.spacing(2),
    border: `5px solid ${theme.palette.primary.light}`,
    padding: theme.spacing(2),
    "& .MuiTypography-overline": {
      fontWeight: "700",
      color: theme.palette.primary.light,
      fontSize: "125%",
      lineHeight: "1.5"
    }

  }
}));

// Widget
export const Register = ({ setPanel }) => {

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
      email: formData.get("email").trim(),
      password: formData.get("password").trim(),
      passwordConfirm: formData.get("passwordConfirm").trim(),
      agreeToTerms: formData.get("agreeToTerms")
    };

    // If something is missing
    if (!values.username || !values.email || !values.password || !values.passwordConfirm) {

      // Rerender with the error
      setState(s => {
        s.error = "One or more fields missing";
        s.isLoading = false;
        return { ...s };
      });

      // Bail
      return;

    }

    // The passwords don't match
    if (values.password !== values.passwordConfirm) {

      // Rerender with the error
      setState(s => {
        s.error = "Passwords don't match";
        s.isLoading = false;
        return { ...s };
      });

      // Bail
      return;

    }

    // User didn't agree
    if (!values.agreeToTerms) {

      // Rerender with the error
      setState(s => {
        s.error = "Please accept terms before continuing.";
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

    // Call the register util
    app.util.register(values)

      // All good
      .then(() => {

        // Render confirm
        setState(s => {
          s.confirm = true;
          return { ...s };
        });

      })

      // Not so much
      .catch((error) => {

        // Clear the prefix
        error.name = "";

        // Rerender with the error
        setState(s => {
          s.error = error.toString();
          s.isLoading = false;
          return { ...s };
        });

      });

  };

  // If we've completed registration
  if (state.confirm) {

    return (
      <Box pt="50px" pb="50px">

        <Box textAlign="center" mb={1}>
          <Typography variant="h4" component="p">Congratulations!</Typography>
        </Box>

        <Box textAlign="center" mb={3}>
          <Typography variant="subtitle1" component="p">You have successfully created your account!</Typography>
        </Box>

        <Button
          size="large"
          variant="contained"
          fullWidth
          color="primary"
          disableElevation
          style={{ borderRadius: "50px" }}
          onClick={() => {

            // Close the dialog
            app.util.dialog(false);

          }}
        >Done</Button>

      </Box>
    );

  }

  // Render
  return (
    <>
      <Box>

        <Box>
          <Typography component="h2" className={classes.title}>Create Account</Typography>
        </Box>

        <Box mb={5}>
          <Typography component="p" className={classes.subTitle}>Sign up to continue</Typography>
        </Box>

        <Box component="form" onSubmit={formSubmit} ref={form} mb={5}>

          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField name="username" label="Username" variant="outlined" fullWidth required />
            </Grid>

            <Grid item xs={12}>
              <TextField name="email" label="Email Address" variant="outlined" fullWidth required />
            </Grid>

            <Grid item xs={6}>
              <TextField name="password" label="Password" variant="outlined" fullWidth type="password" />
            </Grid>

            <Grid item xs={6}>
              <TextField name="passwordConfirm" label="Confirm" variant="outlined" fullWidth type="password" required />
            </Grid>

            <Grid item xs={12}>
              <Box className={classes.iAmVogon}>

                <Typography variant="overline" component="div">We&apos;re looking for talent</Typography>

                <Typography variant="body2" gutterBottom>Are you an upcoming Vogon Poet, or a normal Poet that identifies as Vogon, or just someone who is crafty with words and has a propensity for shouting? Why not showcase your talent on Vogon Odist!</Typography>

                <Box>
                  <FormControlLabel
                    value="isVogon"
                    control={<Checkbox color="primary" />}
                    label={<Typography variant="subtitle2">I wish to register as the Poet: </Typography>}
                    labelPlacement="end"
                  />
                </Box>

                <Box>
                  <TextField name="vogonName" label="Vogon name" variant="outlined" fullWidth />
                </Box>

              </Box>
            </Grid>

            {
              state.error && (
                <Grid item xs={12}>
                  <Alert severity="error">{state.error}</Alert>
                </Grid>
              )
            }

            <Grid item xs={12}>
              <Box mt={3}>
                {
                  state.isLoading

                    ? <Box p={2}><LinearProgress /></Box>

                    : <Button size="large" variant="contained" fullWidth type="submit" color="primary">Sign Up</Button>
                }
              </Box>
            </Grid>

          </Grid>

        </Box>

      </Box>

      <Grid container>

        <Grid item xs={8}>
          <Typography>Already have an account?</Typography>
        </Grid>

        <Grid item xs={4}>
          <Box textAlign="right" onClick={() => setPanel("login")}>
            <Typography color="primary" style={{ cursor: "pointer", fontWeight: "600" }}>Log in</Typography>
          </Box>
        </Grid>

      </Grid>
    </>
  );

};

// Make it clear
export default Register;