import * as React from 'react';
import axios from 'axios';
import { Box, Button, Fab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CardActions, Grid, Card, CardContent, CardMedia, Typography, CardActionArea, AppBar, Toolbar, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
    baseURL: 'http://192.168.137.207:3001'
  });


const CardGrid = () => {

  const userId = localStorage.getItem('userId')

  const navigate = useNavigate();
  
  const [post, setPost] = React.useState(null);

    React.useEffect(() => {
      instance.get('/products/all').then((response) => {
        setPost(response.data)
      });
    }, []);
    
    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log('Searching for:', searchTerm);

        if (searchTerm) {
            const url = `/products/search/${searchTerm}`;

            instance.get(url).then((response) => {
                setPost(response.data)
                console.log('Data: ', response.data);
            });
        }

        else {
            instance.get('/products/all').then((response) => {
                setPost(response.data)
            });
        }
    };

    const showMyListings = () => {
      instance.get(`/products/id/${userId}`).then((response) => {
          if (response) {
            setPost(response.data)
            console.log('Data: ', response.data);
          }
      }).catch((error) => {
        console.error('POST Error:', error);
      });
    }

    if (!post) return null;

    return (
        <div className='CardGrid'>

            <Box height={90} />

            <Box sx={{ paddingX: 8, display: 'flex', flexGrow: 1, justifyContent: 'center',}}>
              
              <form onSubmit={handleSearchSubmit}>
                <TextField
                  id="search-bar"
                  label="Search"
                  variant="outlined"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  size="small"
                  sx={{ width: '500px' }}
                />
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </form>
              <Box sx={{display: 'flex', flexGrow: 1, spacing: 4}} />
              <Button variant='contained' sx={{backgroundColor:'#d0bcff'}} onClick={showMyListings}>My Listings</Button>
              <Box width={7}/>
              <Button href='/add-listing' variant='contained' size='medium'>ADD Listing</Button>
            </Box>

            <Grid container spacing={2} marginTop={2} justifyContent="center" paddingX={8} >
            {post.map((card) => (

                <Grid item xs={12} sm={6} md={4} lg={3} key={card.id}>
                    <Card style={{ backgroundColor: 'secondary'}} >
                        <CardActionArea>
                        <CardMedia
                            image={card.image}
                            style={{ height: 200 }}
                        />
                        <CardContent style={{ color: 'text' }}>
                            <Typography variant="h5" component="div">
                            {card.name}
                            </Typography>
                            <Typography variant="body2" component="p">
                            {card.description}
                            </Typography>
                        </CardContent>
                        </CardActionArea>

                        <CardActions>

                        <Box sx={{ flexGrow: 1 }} />

                        <Button variant='outlined' href={`/products/${card.id}`}>
                          
                          <Typography variant='h6'>
                            ₹ {card.price}
                          </Typography>
                        </Button>

                        </CardActions>
                    </Card>
                </Grid>
            ))}
            </Grid>
        </div>
  );
};

export default CardGrid;