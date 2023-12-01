import React from 'react';
import { Box, Link, Grid, Card, CardContent, CardMedia, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';
import Header from './Header';

const instance = axios.create({
    baseURL: 'http://192.168.137.207:3001'
  });

const Product = ({productId}) => {

    const currentURL = window.location.href.substring(21);

    const [product, setProduct] = React.useState(null);
  
    React.useEffect(() => {
      instance.get(currentURL).then((response) => {
        setProduct(response.data)
        console.log(response.data)
      });
    }, []);
  
    if (!product) return null;

    function createPost(event) {
        console.log(event);
        const data = new FormData(event.currentTarget);

        instance
          .post(`/products/placebid/${product.id}`, {
            buyer: localStorage.getItem('userId'),
            price: data.get('price')
          })
          .then((response) => {
            setProduct(response.data)
            console.log(response.data);
          });
        }

    function FreezeBid(event) {
        instance
            .post(`/products/freezebid/${product.id}`, {buyer: localStorage.getItem('userId'), seller: product.seller});
        
        alert('The Bid has been frozen, the buyer is User'+product.seller+'. \nGo to Chat and enter their User Id to chat with them');
        }
  
    return (
        <div>
            <Header />
            <Box padding={10}>
                <Card>
                    <CardMedia image={product.image} alt={product.name} style={{ height: 250 }} />
                    <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                        <Typography variant="h5">{product.name}</Typography>
                        <Typography variant="body1">{product.description}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <Typography variant="body1">
                            Base price: ₹{product.basePrice}
                        </Typography>
                        <Typography variant="h6">
                            Current bid: ₹{product.price}
                        </Typography>
                        <br />
                            
                        <Box component="form" onSubmit={createPost} noValidate sx={{ mt: 1 }}>
                            <TextField
                            margin="normal"
                            required
                            id="price"
                            label="Your Bid"
                            name="price"
                            />

                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Place Bid
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Button variant="text" onClick={FreezeBid}>
                                        Freeze Bid
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        </Grid>
                    </Grid>
                    </CardContent>
                </Card>
                </Box>

        </div>
    )
  };

  export default Product;
  
