// import logo from './logo.svg';
// import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';

import ButtonAppBar from './components/ButtonAppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  responsive_image: {
    width: "100%",
    height: "auto",
  },
}));

function App() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonAppBar />
     <Container maxWidth="lg">
    <Grid container spacing={3}>
        <Grid  item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Paper className={classes.paper}>
              <img src="https://via.placeholder.com/600/56a8c2" className={classes.responsive_image}/>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Paper className={classes.paper}>
              <img src="https://via.placeholder.com/600/56a8c2" className={classes.responsive_image}/>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Paper className={classes.paper}>
              <img src="https://via.placeholder.com/600/56a8c2" className={classes.responsive_image}/>
          </Paper>
        </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
