import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from './AuthContext';

const Dash = ({ userInfo, setUserInfo }) => {
    const {logout: logoutAuth} = useAuth();
    const username = userInfo?.username ?? '';
    const logout =  () => {
        fetch('http://localhost:3001/api/v1/logout', {
            credentials: 'include',
            method: 'POST'
        });
        setUserInfo(null);
        logoutAuth();
    }
    useEffect(() => {
        fetch("http://localhost:3001/api/v1/profile", { credentials: 'include' })
            .then((data) => data.json())
            .then((user) => setUserInfo(user));
        }, [setUserInfo]);
    return (
        <nav>
            <NavLink to='/post/create'>Create Post</NavLink>
            <a onClick={logout}>Logout  </a> {username} 
        </nav>
    )
}

export default Dash
