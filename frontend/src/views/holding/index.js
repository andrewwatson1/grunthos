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

        <Typography className={classes.poem} gutterBottom variant="body1">
          Oh freddled gruntbuggly,<br />
          Thy micturations are to me,<br />
          As plurdled gabbleblotchits,<br />
          in midsummer morning On a lurgid bee...
        </Typography>

        <Typography variant="caption" className={classes.author}>
          - Prostetnic Vogon Jeltz
        </Typography>

      </Box>
    </Box>
  );

};

// Make it clear
export default Holding;