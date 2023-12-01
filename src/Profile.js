import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, Grid, Box, Button, TextField, Typography } from '@mui/material'
import { LockOutlined } from '@mui/icons-material';


const instance = axios.create({
  baseURL: 'http://192.168.137.207:3001'
});

const userId = localStorage.getItem('userId');

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    instance.get(`/users/profile/${userId}`)
      .then(response => {
        setProfile(response.data);
        console.log("data: ", response.data)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'accent.main' }}>
                      <LockOutlined />
          </Avatar>

          <Typography component="h1" variant="h5" sx={{color: 'white'}}>
            User Profile
          </Typography>

          <Box component="form" sx={{ mt: 3, mb: 3, flexDirection: 'column'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    disabled
                    id="outlined-disabled"
                    label={profile.name}
                    fullWidth
                    defaultValue={profile.name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                  fullWidth
                  disabled
                  id="outlined-disabled"
                  label={profile.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                  fullWidth
                  disabled
                  id="outlined-disabled"
                  label={profile.phone}
                  defaultValue={profile.phone}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                  fullWidth
                  disabled
                  id="outlined-disabled"
                  label={profile.hostel}
                  defaultValue={profile.hostel}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button href='/' fullWidth variant='outlined'>go back</Button>
                </Grid>

            </Grid>
          </Box>
      </Box>
      
    </div>
  );
};

export default Profile;



{/* <Container component="main" maxWidth="xs">
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
          <Box component="form" noValidate onSubmit={handleSubmit} >
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
      </Container> */}