import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/login/', credentials) // Adjust the endpoint as needed
        .then(response => {
            console.log('Login successful:', response.data);
            navigate('/add');  // Redirect to another page after successful login
        })
        .catch(error => {
            console.error('There was an error logging in!', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
