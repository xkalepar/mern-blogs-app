import React, { useEffect, useState, useContext } from "react";
import Blog from "../components/Blog";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/api/v1/blogs")
      .then((res) => res.json())
      // .then(json => setBlogs(json))
      .then((json) => setPosts(json.posts));
  }, []);
  console.log(posts)
  return (
    <div className="container">
      {posts.length > 0 &&
        posts.map(post => {
          return <Blog {...post} key={post._id} />
        })}
    </div>
  );
};

export default IndexPage;
