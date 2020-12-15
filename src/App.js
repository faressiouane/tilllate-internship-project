// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
 
  //states
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

// custom reducer for grouping images based on their albumId:
  const groupByAlbumId = (acc, val)=>{
    // Group initialization
    if (!acc[val.albumId]) {
      acc[val.albumId] = [];
    }
    //Grouping
    acc[val.albumId].push(val);
    return acc;
  }

//component did mount:
  useEffect(() => {
    //axios fetch api
    const fetchData = async () => {
      const result = await axios(
        'https://jsonplaceholder.typicode.com/photos',
      );
      const images = result.data.filter(img => img.albumId % 2 === 0); //reciving the result & filtring it to get imgs with even albumId only
      const albums = images.reduce(groupByAlbumId, {}) //grouping that belong to the same album (share the same albumId value) into an object using my custom reducer
      const imgs = [] // initialize imgs var to recive the 1st img from each album (used later to initialize images state)
      for (const album in albums) { //looping let i around albums, taking the 1st img, assign it to imgs
        imgs.push(albums[album][0]);
      }
      setImages(imgs)
      setIsLoading(false);
    };
 
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <ButtonAppBar />
     <Container maxWidth="lg">

    <Grid container spacing={3}>

          {isLoading && <h1>loading images ...!</h1>}
          {images.map(img => (
                    <Grid  item xs={12} sm={12} md={6} lg={4} xl={4} key={img.id}>
                      <Paper className={classes.paper}>
                      albumId : {img.albumId} || imageId : {img.id} 
                          <img src={img.url} className={classes.responsive_image} alt={img.title}/>
                      </Paper>
                    </Grid>
          ))}

        </Grid>
      </Container>
    </div>
  );
}

export default App;
