// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5001/api/login', { username, password });
            const token = response.data.token;
            localStorage.setItem('user', token);
            console.log('Login successful');
            onLogin();
        } catch (error) {
            setError('Invalid username or password.');
            console.error('Login failed', error.response.data.error);
        }
    };

    const navigateToSignUp = () => {
        navigate('/signup');
    };

    return (
        <div className="login-container">
            <h2 className="login-heading">Login</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="login-group">
                <input
                    type="text"
                    className="login-input"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="login-group">
                <input
                    type="password"
                    className="login-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="login-button" onClick={handleLogin}>
                Login
            </button>
            <div className="already-registered">
                Not registered yet? <span className="login-link" onClick={navigateToSignUp}>Sign up</span>
            </div>
        </div>
    );
};

export default Login;
