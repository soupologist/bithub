import axios from 'axios';
import * as React from 'react';

import { Card, CardActions, CardContent, Button, Typography } from '@mui/material/'

const instance = axios.create({
  baseURL: 'http://192.168.137.207:3001'
});

function App() {

  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    instance.get('/products/all').then((response) => {
      setPost(response.data)
    });
  }, []);

  if (!post) return null;

  return (
    <div>
      {post.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h3>{product.price}</h3>
        </div>
      ))}
    </div>
  );
};

export default App;
