import React, { useState } from 'react';
import axios from 'axios';
// import AxiosDefault from '../service/AxiosDefault';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/site/signedup', {
                username,
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true // Include credentials like cookies if needed
            });
            //const response = await axios.post('http://localhost:8080/site/Signedup', { username, email, password });
            // const response = await AxiosDefault({
            //     method: "POST",
            //     url: "site/Signedup",
            //     data: {
            //         username, email, password
            //     },
            //   });
            //   return response.data;
            console.log("response",response.data.status);
            if (response.data.status == "success") {               
                setMessage('Registration successful!');
                sessionStorage.setItem('token',response.data.auth_key);
                navigate('/site/index');             
               
            } else {
                console.error('Registration failed:', "no data");
                setMessage(response.data.msg);
            }
        } catch (error) {
            if (error.response) {
                console.error('Registration error:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error:', error.message);
            }
            // setMessage('Error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}  
                placeholder="Username"
                required
            />
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
            <button type="submit">Register</button>
            <p>{message}</p>
        </form>
    );
}

export default Register

