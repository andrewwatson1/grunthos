// System
import React from "react";

// Mui
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// Mothership
import AppContext from "./../../context/AppContext";

// Widgets
import LoginDialog from "./../../widgets/loginDialog";

// Custom layout
const useStyles = makeStyles(() => ({
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

      </Box>
    </Box>
  );

};

// Make it clear
export default Holding;