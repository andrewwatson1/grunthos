// System
import React from "react";

// Mui
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// Custom styles
const useStyles = makeStyles((theme) => ({
  dropHero: {
    background: "#bababa",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2)
  },

  heading: {
    background: theme.palette.primary.main,
    color: "#bababa",
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    "& .MuiTypography-caption": {
      textTransform: "uppercase"
    }
  },

  title: {
    color: theme.palette.secondary.main,
    fontStyle: "italic",
    fontSize: "225%",
    fontWeight: "700",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "300%"
    }
  },

  artist: {
    color: "#dadada",
    fontSize: "90%"
  },

  body: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2)
  },

  poem: {
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[24],
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    "& .MuiTypography-root": {
      whiteSpace: "pre-line"
    }
  },

  caution: {
    fontSize: "80%",
    marginBottom: theme.spacing(1),
    "& strong": {
      color: theme.palette.error.dark
    }
  },

  specs: {

  },

  spec: {
    background: theme.palette.grey[700],
    padding: theme.spacing(1),
    color: theme.palette.getContrastText(theme.palette.grey[700]),
    "& strong": {
      fontWeight: "500"
    },
    "& span": {
      fontWeight: "300",
      display: "block",
      marginBottom: theme.spacing(.5),
      fontSize: "70%",
      lineHeight: "1",
      textTransform: "uppercase"
    }
  },

  auction: {
    background: theme.palette.primary.dark,
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
    color: theme.palette.primary.contrastText,
    "& .auction-item-title": {
      fontSize: "75%",
      textTransform: "uppercase"
    },
    "& .auction-item-value": {}
  }

}));

// Widget
export const DropHero = ({ drop }) => {

  // Classes
  const classes = useStyles();

  // State
  const [data, setData] = React.useState({});

  // Listen for updates to the drop
  React.useEffect(() => {

    // If we have a drop
    if (drop) {

      // Update
      setData({ ...drop });

      /*
      // Used to test loaders
      setData({
        title: drop.title,
        artist: drop.artist,
        content: drop.content,
        auction: drop.auction
      });
      */

      // Done
      return;

    }

    // Clear old drop
    setData({});

  }, [drop]);

  // render
  return (
    <Box className={classes.dropHero}>

      <Box className={classes.heading}>
        <Container>

          {data.title

            ? <>
              <Typography variant="caption">Available Now:</Typography>
              <Typography variant="h2" className={classes.title}>{data.title}</Typography>
              <Typography className={classes.artist}><b>{data.artist}</b></Typography>
            </>

            : <Skeleton animation="wave" variant="rect" width="100%" height={50} />

          }
        </Container>
      </Box>

      <Box className={classes.body}>
        <Container>

          {data.content && <Typography className={classes.caution}><strong>Use caution while reading.</strong> If you feel discomfort, well that&apos;s bound to happen.</Typography>}

          {data.content
            ? <Box className={classes.poem}><Typography>{data.content}</Typography></Box>
            : <Skeleton animation="wave" variant="rect" width="100%" height={125} />}

          <Box className={classes.specs}>
            <Grid container spacing={2}>

              <Grid item>

                {data.artist
                  ? <Box className={classes.spec}><Typography><span>Artist</span> <strong>{data.artist}</strong></Typography></Box>

                  : <Skeleton animation="wave" variant="rect" width={100} height={50} />}

              </Grid>

              <Grid item>

                {data.artist
                  ? <Box className={classes.spec}><Typography><span>Format</span> <strong>NFT</strong></Typography></Box>

                  : <Skeleton animation="wave" variant="rect" width={50} height={50} />}

              </Grid>

            </Grid>
          </Box>

          {
            data.auction
              ? <Box className={classes.auction}>
                <Grid container spacing={2} alignItems="center">

                  <Grid item xs={12} md={5}>
                    <Typography className="auction-item-title">Auction Status</Typography>
                    <Typography className="auction-item-value">2 Days, 7 hours, 34 mins</Typography>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Typography className="auction-item-title">Current Bid</Typography>
                    <Typography className="auction-item-value">32 SOL</Typography>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Box>
                      <Button variant="contained" color="secondary">Make an offer</Button>
                    </Box>
                  </Grid>

                </Grid>
              </Box>
              : <Skeleton animation="wave" variant="rect" width="100%" height={50} />
          }

        </Container>
      </Box>

    </Box>
  );

};

// Make it clear
export default DropHero;