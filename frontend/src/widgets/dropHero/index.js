// System
import React from "react";

// Chart js
import { Bar } from "react-chartjs-2";

// Mui
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// Custom styles
const useStyles = makeStyles((theme) => ({

  title: {
    "& .MuiTypography-root": {
      fontSize: "150%",
      fontWeight: "500"
    }
  },

  poet: {
    "& .MuiTypography-root": {
      fontSize: "90%",
      fontWeight: "600",
      marginBottom: "50px"
    }
  },

  poem: {
    "& .MuiTypography-root": {
      fontFamily: "'Kirang Haerang', cursive",
      fontSize: "200%",
      marginBottom: "50px",
      whiteSpace: "pre"
    }
  }

}));

// Widget
export const DropHero = ({ drop }) => {

  // Classes
  const classes = useStyles();

  // Theme
  const theme = useTheme();

  // State
  const [data, setData] = React.useState({});

  // Listen for updates to the drop
  React.useEffect(() => {

    // If we have a drop
    if (drop) {

      // Update
      setData({
        title: drop.snowcrash_drop.title,
        poem: drop.snowcrash_drop.poem,
        poet: drop.snowcrash_drop.poet
      });

      // Done
      return;

    }

    // Clear old drop
    setData({});

  }, [drop]);

  // render
  return (
    <Card>
      <CardContent>

        <Box className={classes.title}>
          {
            data.title
              ? <Typography component="h2">{data.title}</Typography>
              : <Box className={classes.titleLoader}><LinearProgress /></Box>
          }
        </Box>

        <Box className={classes.poet}>
          {
            data.poet
              ? <Typography>{data.poet}</Typography>
              : <Box className={classes.poetLoader}><LinearProgress /></Box>
          }
        </Box>

        <Grid container>

          <Grid item xs={12} sm={6} md={8}>

            <Box className={classes.poem}>
              {
                data.poem
                  ? <Typography>{data.poem}</Typography>
                  : <Box className={classes.poemLoader}><CircularProgress /></Box>
              }
            </Box>

          </Grid>

          <Grid item xs={12} sm={6} md={4}>

            <Box>

              <Bar

                data={{
                  labels: ["Good", "Bad"],
                  datasets: [
                    {
                      label: "Votes",
                      data: [254, 344],
                      backgroundColor: [
                        theme.palette.success.light,
                        theme.palette.error.light
                      ]
                    }
                  ]
                }}

                options={{
                  plugins: {
                    legend: {
                      display: false
                    }
                  },
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true
                        }
                      }
                    ]
                  }
                }}

              />

            </Box>

            <Grid container spacing={3}>

              <Grid item xs={6}><Button variant="contained" fullWidth>Good</Button></Grid>
              <Grid item xs={6}><Button variant="contained" fullWidth>Bad</Button></Grid>

              <Grid item xs={6}><Typography variant="body2">Rank</Typography></Grid>
              <Grid item xs={6}><Typography variant="body2">389/518</Typography></Grid>

              <Grid item xs={6}><Typography variant="body2">Status</Typography></Grid>
              <Grid item xs={6}><Typography variant="body2">Available (<u>Make offer</u>)</Typography></Grid>

            </Grid>

          </Grid>

        </Grid>

      </CardContent>
    </Card >
  );

};

// Make it clear
export default DropHero;