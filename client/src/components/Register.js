import React, { useState } from 'react'

const Register = () => {
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');

    const registerHandler = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/api/v1/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-type': 'application/json' }
        }).then(res=> res.json())

        console.log(response)
        if (response.status === 201) console.log('succes')
        else console.log('fail')

    }

    return (
        <form className='register' onSubmit={registerHandler}>
            <input type="text" name='username' value={username} onChange={ev => setusername(ev.target.value)} />
            <input type="password" name='password' value={password} onChange={ev => setpassword(ev.target.value)} />
            <button>Sing Up</button>
        </form>
    )
}

export default Register
