import * as React from 'react';
import { Box, Button, CardActions, Grid, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import './App.css'
import Header from './Header.js'
import CardGrid from './CardGrid.js';

const Home = () => {
  
    return (
        <div className='Home'>
            <Header />

            <CardGrid />
        </div>
  );
};

export default Home;