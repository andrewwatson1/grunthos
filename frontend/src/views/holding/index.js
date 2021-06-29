// System
import React from "react";

// Mui
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";

// Mothership
import AppContext from "./../../context/AppContext";

// Widgets
import LoginDialog from "./../../widgets/loginDialog";

// Custom layout
const useStyles = makeStyles((theme) => ({
  comingSoon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    flexGrow: "1",
    height: "100%",
    width: "100%"
  },
  poem: {
    fontFamily: "'Kirang Haerang', cursive",
    fontSize: "400%",
    marginBottom: "50px"
  },
  content: {
    maxWidth: "768px",
    padding: "20px"
  },
  thumb: {
    display: "inline",
    "& img ": {
      background: theme.palette.success.main,
      display: "inline-block"
    },
    "& .worse": {
      background: theme.palette.error.main,
      transform: "rotate(180deg)",
      marginRight: "20px"
    }
  },
  offerBtn: {
    fontSize: "125%"
  },
  focus: {
    width: "100%",
    height: "auto"
  },
  modal: {
    background: theme.palette.background.paper,
    padding: theme.spacing(2)
  }
}));

// Our view
export const Holding = () => {

  // Wire up
  const app = React.useContext(AppContext);

  // Classes
  const classes = useStyles();

  // Login open event
  const handleImageClick = () => app.util.dialog({
    isOpen: true,
    content: <LoginDialog />
  });

  // Render
  return (
    <Box className={classes.comingSoon}>
      <Box className={classes.content} onClick={handleImageClick}>

        <Typography className={classes.poem}>
          Oh freddled gruntbuggly,
          Thy micturations are to me,
          As plurdled gabbleblotchits,
          in midsummer morning On a lurgid bee...
        </Typography>

        <Grid container>

          <Grid item xs={8}>
            <Button disabled color="primary" variant="outlined" className={classes.offerBtn}>Purchase: NFT</Button>
          </Grid>

          <Grid item xs={4}>
            <Box textAlign="right">

              <Grid container>

                <Grid item style={{ flexGrow: 1, textAlign: "left" }}>
                  <Typography variant="caption">Meh...</Typography>
                </Grid>

                <Grid item>
                  <Typography variant="caption">Ouch!</Typography>
                </Grid>
              </Grid>

              <Rating name="customized-10" defaultValue={2} max={10} />

            </Box>
          </Grid>

        </Grid>

      </Box>
    </Box>
  );

};

// Make it clear
export default Holding;