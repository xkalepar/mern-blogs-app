import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Article from '../components/Article';

const PostPage = () => {
  const {id} = useParams();
  const [postInfo, setPostInfo] = useState({});
  useEffect(() => {
  fetch(`http://localhost:3001/api/v1/post/${id}`, {
    credentials: 'include'
  })
  .then(data=> data.json())
  .then(post=> setPostInfo(post))
  
  }, [id]);
  return (
    <Article {...postInfo} />
  )
}

export default PostPage
