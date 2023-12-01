import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './Home.js'
import Login from './Login.js';
import AddListing from './AddListing.js';
import SignUp from './SignUp.js';
import Profile from './Profile.js';
import Product from './Product.js';
import ChatRoom from './ChatRoom.js';
import Postu from './Postu.js';

const theme = createTheme({
  palette: {
    mode: 'dark',
    text: {
      main: "#FFFFFF"
    },
    primary: {
      main: '#FFA31A'
    },
    secondary: {
      main: '#808080'
    },
    accent: {
      main: '#d0bcff'
    }

  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-listing" element={<AddListing />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/post" element={<Postu />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;