import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [age, setage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [idCardNumber, setIdCardNumber] = useState('');
    const [error, setError] = useState(''); // Initialize error state

    const navigate = useNavigate();

    const handleSignup = async () => {

        // Client-side validation
        if (!username || !password || !firstName || !lastName || !age || !phoneNumber || !city || !idCardNumber) {
            setError('All fields are required.');
            return;
        }

        // Additional client-side validation
        if (!/^[a-zA-Z0-9_-]{3,16}$/.test(username)) {
            setError('Invalid username format.');
            return;
        }

        if (!/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/.test(password)) {
            setError('Password must contain at least one letter and one number, and be at least 6 characters long.');
            return;
        }

        if (!/^[0-9]{10}$/.test(phoneNumber)) {
            setError('Invalid phone number format.');
            return;
        }

        if (!/^[0-9]{4}$/.test(idCardNumber)) {
            setError('Invalid ID card number format.');
            return;
        }

        if (isNaN(age) || age <= 0) {
            setError('Invalid age.');
            return;
        }


        try {

            // If the username does not exist, proceed with sign-up
            const response = await axios.post('http://localhost:5001/api/signup', {
                username,
                password,
                firstName,
                lastName,
                age,
                city,
                phoneNumber,
                idCardNumber,
            });

            // Check if response is defined and has a data property
            if (response && response.data) {
                console.log('Signup successful:', response.data.message);
                navigateToLogin();
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Signup failed:', error.response.data.error);
                setError('Username already in use.');
            }
        }
    };

    const navigateToLogin = () => {
        navigate('/');
    };

    return (
        <div className='signup-container'>
            <h2 className='signup-heading'>Signup</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="signup-form">
                <div className="signup-group">
                    <label htmlFor="username" className="signup-label">Username</label>
                    <input className="signup-input" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="signup-group">
                    <label htmlFor="password" className="signup-label">Password</label>
                    <input className="signup-input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="signup-group">
                    <label htmlFor="firstName" className="signup-label">First Name</label>
                    <input className="signup-input" type="text" id="firstName" value={firstName} onChange={(e) => setfirstName(e.target.value)} />
                </div>

                <div className="signup-group">
                    <label htmlFor="lastName" className="signup-label">Last Name</label>
                    <input className="signup-input" type="text" id="lastName" value={lastName} onChange={(e) => setlastName(e.target.value)} />
                </div>

                <div className="signup-group">
                    <label htmlFor="age" className="signup-label">Age</label>
                    <input className="signup-input" type="text" id="age" value={age} onChange={(e) => setage(e.target.value)} />
                </div>

                <div className="signup-group">
                    <label htmlFor="city" className="signup-label">City</label>
                    <input className="signup-input" type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>

                <div className="signup-group">
                    <label htmlFor="phoneNumber" className="signup-label">Phone Number</label>
                    <input className="signup-input" type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>

                <div className="signup-group">
                    <label htmlFor="idCardNumber" className="signup-label">ID Card Number</label>
                    <input className="signup-input" type="text" id="idCardNumber" value={idCardNumber} onChange={(e) => setIdCardNumber(e.target.value)} />
                </div>
            </div>

            <button onClick={handleSignup} className="signup-button">Signup</button>
            <div className="already-registered">
                Already registered? <span className="signup-link" onClick={navigateToLogin}>Login</span>
            </div>
        </div>
    );
};

export default Signup;
