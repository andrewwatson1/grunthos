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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  img: {
    display: "flex",
    flexGrow: 1,
    height: "200px",
    backgroundPosition: "center -180px",
    [theme.breakpoints.up("sm")]: {
      height: "100%",
      backgroundPosition: "center"
    }
  },
  imgLoader: {
    height: "200px",
    [theme.breakpoints.up("sm")]: {
      height: "100%"
    }
  },
  body: {
    background: "#43443a",
    padding: theme.spacing(2),
    "& .MuiTypography-caption": {
      fontWeight: "700",
      color: "#bababa"
    }
  },
  header: {

  },
  title: {
    fontSize: "225%",
    fontFamily: "'Kirang Haerang', cursive",
    color: "#d0ba80",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      fontSize: "300%"
    }
  },
  content: {
    borderRadius: "10px",
    background: "#27271f",
    padding: theme.spacing(2),
    height: "300px",
    overflow: "auto",
    "& .MuiTypography-root": {
      fontFamily: "'Kirang Haerang', cursive",
      whiteSpace: "pre-line",
      fontSize: "150%",
      lineHeight: "1.35",
      color: "#bebdb4"
    }
  },
  caution: {
    fontSize: "80%",
    color: "#bebdb4",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4)
  },
  specs: {
    margin: `${theme.spacing(2)}px 0`
  },
  spec: {
    background: "#d0ba80",
    padding: theme.spacing(1),
    "& .MuiTypography-root": {
      fontSize: "90%",
      fontWeight: "bold",
      "& span": {
        display: "block",
        fontSize: "65%",
        fontWeight: "normal",
        textTransform: "uppercase",
        opacity: ".8"
      }
    }
  },
  auction: {
    background: "#fafafa",
    padding: theme.spacing(2),
    "& .auction-item-title": {
      display: "block",
      opacity: ".8",
      textTransform: "uppercase",
      fontSize: "90%"
    },
    "& .auction-item-value": {
      fontWeight: "bold"
    }
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
        img: drop.img,
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

      <Container>

        <Grid container spacing={2}>

          <Grid item xs={12} sm={5}>

            {data.img
              ? <Box className={classes.img} style={{ backgroundImage: `url(${data.img})` }}></Box>
              : <Skeleton className={classes.imgLoader} animation="wave" variant="rect" />
            }

          </Grid>

          <Grid item xs={12} sm={7}>

            <Box className={classes.body}>

              {data.title
                ? <Box className={classes.header}>
                  <Typography variant="caption">Available Now!!</Typography>
                  <Typography variant="h2" className={classes.title}>{data.title}</Typography>
                </Box>
                : <Skeleton animation="wave" variant="rect" width="100%" height={50} />
              }

              {data.content
                ? <Box className={classes.content}><Typography>{data.content}</Typography></Box>
                : <Skeleton animation="wave" variant="rect" width="100%" height={125} />}

              {data.content && <Typography className={classes.caution}>^ Use caution while reading. If you feel discomfort, well that&apos;s bound to happen.</Typography>}

              <Box className={classes.specs}>

                <Grid container spacing={2}>

                  <Grid item>

                    {data.artist
                      ? <Box className={classes.spec}><Typography><span>Artist</span> {data.artist}</Typography></Box>

                      : <Skeleton animation="wave" variant="rect" width={100} height={50} />}

                  </Grid>

                  <Grid item>

                    {data.artist
                      ? <Box className={classes.spec}><Typography><span>Format</span> NFT</Typography></Box>

                      : <Skeleton animation="wave" variant="rect" width={50} height={50} />}

                  </Grid>

                </Grid>

              </Box>

              {
                data.auction
                  ? <Box className={classes.auction}>
                    <Grid container spacing={2} alignItems="center">

                      <Grid item xs={7} md={5}>
                        <Typography className="auction-item-title">Auction Status</Typography>
                        <Typography className="auction-item-value">2 Days, 7 hours, 34 mins</Typography>
                      </Grid>

                      <Grid item xs={5} md={4}>
                        <Typography className="auction-item-title">Current Bid</Typography>
                        <Typography className="auction-item-value">32 SOL</Typography>
                      </Grid>

                      <Grid item xs={12} md={3}>
                        <Button variant="contained" color="secondary">Make an offer</Button>
                      </Grid>


                    </Grid>
                  </Box>
                  : <Skeleton animation="wave" variant="rect" width="100%" height={50} />
              }

            </Box>

          </Grid>

        </Grid>

      </Container>

    </Box>
  );

};

// Make it clear
export default DropHero;