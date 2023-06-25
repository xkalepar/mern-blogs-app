import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const Article = ({ title, cover, createdAt, auther, _id: id, content }) => {
    const { userInfo } = useContext(UserContext);
    const usernameID = userInfo?.id || '';

    const deleteHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/api/v1/post/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                // Remove the deleted article from the UI
                // const postContainer = e.target.closest('.post-pre-container');
                // postContainer.remove();
                <Navigate to={`/`} />
            } else {
                throw new Error('Failed to delete article');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <article className="post-pre-container" key={id}>
            <div className="info">

                {
                    auther?._id === usernameID && (
                        <>
                        <Link to={`/edit/${id}`}>Edit</Link>
                        <button onClick={deleteHandler}> delete</button>
                        </>
                    )
                }

                <span>
                    createdBy<Link to="post/authors">{auther?.username}</Link>
                </span>
                <span>{createdAt}</span>
            </div>
            <img src={`http://localhost:3001/${cover}`} alt={title} />
            <h2>{title}</h2>
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
            <div>
                {/* {userInfo?.username} */}
            </div>
        </article>
    );
};

export default Article;
