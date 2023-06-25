import React from 'react';
import { NavLink } from 'react-router-dom';

const Auth = () => {
    return (
        <nav>
            <NavLink to="/register">register</NavLink>
            <NavLink to="login">login</NavLink>
        </nav>
    )
}

export default Auth
