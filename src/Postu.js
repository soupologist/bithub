import axios from 'axios';
import React from 'react';

import { Header } from './Header';

const instance = axios.create({
  baseURL: 'http://192.168.137.207:3001'
});

function Postu() {

  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    instance.get('/products/all').then((response) => {
      setPost(response.data)
    });
  }, []);

  function createPost() {
    instance
      .post('/products/placebid/5', {
        buyer: 3,
        price: 113000
      })
      .then((response) => {
        setPost(response.data)
      });
  }

  if (!post) return "No post!"

  return (
    <div>
      <h1>{post.price}</h1>
      <h2>{post.name}</h2>
      <button onClick={createPost}> Create Post </button>
    </div>
  )

}

export default Postu;
