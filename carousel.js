import React, {useState, useEffect} from 'react'
import Carousel from 'react-material-ui-carousel'
import { makeStyles } from '@material-ui/core/styles';
import {Typography,Card,CardActions, Button, Container,CardActionArea,CardMedia,CardContent} from '@material-ui/core'
import axios from 'axios' 
const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    marginTop:100
  },
  media: {
    height: 340,
  },
  center:{marginLeft: 100, textAlign: 'center'}
});
export default function App(e) {
  const classes = useStyles()
    const [employee, setEmployee] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        await axios
          .get("https://randomuser.me/api?results=10")
          .then((response) => setEmployee(response.data.results))
          .catch((error) => console.log(error));
      };
      fetchData();
    }, []);
    useEffect(() => {}, [employee]);
    console.log(employee)
    return (
      <Container  maxWidth="sm">
      <Carousel fullHeightHover = "true" animation = "fade">
      
        {employee.map((e,i)=>
      <Card className={classes.root,classes.hamza}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={e.picture.large}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {e.name.first}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           LIves in {e.location.city}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
        )}
      
      
      </Carousel>
      </Container>
    );
  }
