import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/site/signin', { email, password });
            if (response.data.status === 'success') {
                setMessage('Login successful!');
                sessionStorage.setItem('token',"abcde")
                navigate('/site/dashboard');
                // Save token and handle authentication state
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage('Error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
            <p>{message}</p>
        </form>
    );
}

export default Login;
