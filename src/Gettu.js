import axios from 'axios';
import React from 'react';

import { Header } from './Header';

const instance = axios.create({
  baseURL: 'http://192.168.137.207:3001'
})

function Gettu() {

  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    instance.get('/products/get/4').then((response) => {
      setPost(response.data)
      console.log(response.data)
    });
  }, []);

  if (!post) return null;

  return (
    <div>
      <h1>{post.price}</h1>
      <h2>{post.name}</h2>
    </div>
  )

}

export default Gettu;
