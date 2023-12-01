import * as React from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AddBox } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
  baseURL: 'http://192.168.137.207:3001'
});

export default function AddListing() {

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userId = localStorage.getItem('userId');
    
    instance.post('/products/create', {        
      name: data.get('name'),
      description: data.get('description'),
      basePrice: data.get('basePrice'),
      image: data.get('image'),
      seller: userId})

      .then((response) => {
        console.log('POST Response:', response.data);
      })
      .catch((error) => {
        console.error('POST Error:', error);
      });

      navigate('/');
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'accent.main' }}>
            <AddBox />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Your Product
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  multiline
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="basePrice"
                  required
                  fullWidth
                  id="basePrice"
                  label="Asking Price"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="image"
                  label="Image"
                  name="image"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Listing
            </Button>

          </Box>
        </Box>
      </Container>
  );
}