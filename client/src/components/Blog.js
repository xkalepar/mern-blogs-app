import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ title, cover, createdAt, auther, summary, _id:id }) => {
  return (

    <article className="post-pre-container" key={id}>
        <Link to={`/post/${id}`}>

      <img src={`http://localhost:3001/${cover}`} alt={title} />
        <h2>{title}</h2>
        </Link>
      <div>
        <div className="info">
          <span>
            <Link href="/">{auther?.username}</Link>
          </span>
          <span>{createdAt}</span>
        </div>
        <p className="summary">{summary}</p>
      </div>
    </article>
  );
};

export default Blog;
