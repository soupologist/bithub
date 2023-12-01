import * as React from 'react';
import axios from 'axios';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
  baseURL: 'http://192.168.137.207:3001'
});

export default function Login() {

  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    const userId = localStorage.getItem('userId');

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    instance.post('/users/login', {
      email: data.get('email'),
      password: data.get('password')
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
            Sign in
        </Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              name="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
  );
}