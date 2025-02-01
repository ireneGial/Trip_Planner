import React, { useState, useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard'; // Replace 'Dashboard' with the component you want to show after login
import './Homepage.css';
import MyNavbar from './MyNavbar';

const Homepage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        if (localStorage.getItem("user")) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };

    // Call the checkLoginStatus function when the component mounts
    useEffect(() => {
        handleLogin();
    }, []);

    const containerStyle = {
        marginTop: '100px',
    }

    return (
        <div className="home-page">
            <MyNavbar isLoggedIn={true} currentUser={localStorage.getItem("user")} />
            {isLoggedIn ? (
                <Dashboard />
            ) : (
                <div style={containerStyle}>
                    <h1>Welcome to Trip Planner</h1><Login onLogin={handleLogin} />
                </div>
            )}
        </div>
    );
};

export default Homepage;
