import React from 'react'
import { NavLink } from 'react-router-dom'
import UserData from './UserData'

const Header = () => {

    return (
        <header>
            <NavLink className='logo' to="/">Hodifa's Blogs</NavLink>
            <UserData/>
        </header>
    )
}

export default Header;
