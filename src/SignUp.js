import * as React from 'react';
import axios from 'axios';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
    baseURL: 'http://192.168.137.207:3001'
  });

export default function SignUp() {

    const navigate = useNavigate();

    const handleSubmit = (event) => {

    const userId = localStorage.getItem('userId');

    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log({
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
        phone: data.get('phone'),
        hostel: data.get('hostel')
    });

    instance.post('/users/signup', {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
        phone: data.get('phone'),
        hostel: data.get('hostel')
    })
      .then((response) => {
        console.log('POST Response:', response.data);
        localStorage.setItem('userId', response.data);
      })
      .catch((error) => {
        console.error('POST Error:', error);
      });

      if (userId) {
        navigate('/'); // Route to the dashboard for logged-in users
      };
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="hostel"
                  label="Hostel"
                  name="hostel"
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}