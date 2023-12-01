import * as React from 'react';
import axios from 'axios';
import { AppBar, Box, Toolbar, IconButton } from '@mui/material'
import { AccountCircle, Chat } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Logo from './media/logo.png'

const instance = axios.create({
  baseURL: 'http://192.168.137.207:3001'
});

export default function Header() {

  const userId = localStorage.getItem('userId');

  const navigate = useNavigate();

  const onClickProfile = () => {
    if (userId) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <div position="fixed">

      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            <a href='/'><img src={Logo} alt='Bithub' style={{ width: 104, height: 44 }}/></a>
            
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconButton 
                size="large"
                color="primary"
                href='/chat'
              >
                <Chat />
              </IconButton>
            </Box>
            <Box>
              <IconButton 
                size="large"
                color="primary"
                onClick={onClickProfile}
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}