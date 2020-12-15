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
  
  const [error, setError] = useState(null)

  //lifecycle hooks
  // useEffect(()=>{
  //   fetch('https://jsonplaceholder.typicode.com/photos')
  //     .then(res => res.json())
  //     .then(
  //       (img) => {
  //         const images = img.filter(img => img.albumId % 2 === 0);
  //         for (let i = 0; i < images.length; i++) {
  //           console.log(images[i][0]);
  //         }
  //         console.log(images);
  //       },
  //       (error) => {
  //         setIsLoading(true)
  //         setError(error)
  //       }
  //     )
  // },[])
  const groupByAlbumId = (acc, val)=>{
    // Group initialization
    if (!acc[val.albumId]) {
      acc[val.albumId] = [];
    }
    //Grouping
    acc[val.albumId].push(val);
    return acc;
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://jsonplaceholder.typicode.com/photos',
      );
      const images = result.data.filter(img => img.albumId % 2 === 0);
      const groups = images.reduce(groupByAlbumId, {})
      const imgs = []
           for (let i = 2; i < 51; i += 2) {
             imgs.push(groups[i][0]) 
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

          {error && <h1>{error.message}</h1>}
          {isLoading && <h1>loading images ...!</h1>}
          {images.map(img => (
                    <Grid  item xs={12} sm={12} md={6} lg={4} xl={4} key={img.id}>
                      <Paper className={classes.paper}>
                          {img.id} || {img.albumId}
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
