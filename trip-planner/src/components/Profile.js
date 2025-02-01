import MyNavbar from './MyNavbar';
import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        age: '',
        phoneNumber: '',
        city: '',
        idCardNumber: '',
    });

    const [error, setError] = useState('');

    useEffect(() => {
        const usernameToRetrieve = localStorage.getItem("user");

        localStorage.clear();
        localStorage.setItem("user", usernameToRetrieve);

        fetch(`http://localhost:5001/api/user/${usernameToRetrieve}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setUserData(data.user || {});
            })
            .catch(error => {
                setError('Error retrieving user information.');
                console.error('Error:', error);
            });
    }, []);

    const update_info = async () => {

        // Client-side validation
        if (!userData.username || !userData.password || !userData.firstName || !userData.lastName || !userData.age || !userData.phoneNumber || !userData.city || !userData.idCardNumber) {
            setError('All fields are required.');
            return;
        }

        // Additional client-side validation
        if (!/^[a-zA-Z0-9_-]{3,16}$/.test(userData.username)) {
            setError('Invalid username format.');
            return;
        }

        if (!/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/.test(userData.password)) {
            setError('Password must contain at least one letter and one number, and be at least 6 characters long.');
            return;
        }

        if (!/^[0-9]{10}$/.test(userData.phoneNumber)) {
            setError('Invalid phone number format.');
            return;
        }

        if (!/^[0-9]{4}$/.test(userData.idCardNumber)) {
            setError('Invalid ID card number format.');
            return;
        }

        if (isNaN(userData.age) || userData.age <= 0) {
            setError('Invalid age.');
            return;
        }
        setError('')
        try {
            const response = await fetch(`http://localhost:5001/api/user/${userData.username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log('User information updated successfully');
        } catch (error) {
            setError('Error updating user information.');
            console.error('Error:', error);
        }
    };

    return (
        <>
            <MyNavbar isLoggedIn={Boolean(localStorage.getItem("user"))} currentUser={localStorage.getItem("user")} />
            <div className='signup-container'>
                <h2 className='signup-heading'>Update your personal information</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="signup-form">
                    <div className="signup-group">
                        <label htmlFor="username" className="signup-label">Username</label>
                        <input disabled className="signup-input" type="text" id="username" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                    </div>

                    <div className="signup-group">
                        <label htmlFor="password" className="signup-label">Password</label>
                        <input className="signup-input" type="password" id="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
                    </div>

                    <div className="signup-group">
                        <label htmlFor="firstName" className="signup-label">First Name</label>
                        <input className="signup-input" type="text" id="firstName" value={userData.firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} />
                    </div>

                    <div className="signup-group">
                        <label htmlFor="lastName" className="signup-label">Last Name</label>
                        <input className="signup-input" type="text" id="lastName" value={userData.lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} />
                    </div>

                    <div className="signup-group">
                        <label htmlFor="age" className="signup-label">Age</label>
                        <input className="signup-input" type="text" id="age" value={userData.age} onChange={(e) => setUserData({ ...userData, age: e.target.value })} />
                    </div>

                    <div className="signup-group">
                        <label htmlFor="city" className="signup-label">City</label>
                        <input className="signup-input" type="text" id="city" value={userData.city} onChange={(e) => setUserData({ ...userData, city: e.target.value })} />
                    </div>

                    <div className="signup-group">
                        <label htmlFor="phoneNumber" className="signup-label">Phone Number</label>
                        <input className="signup-input" type="text" id="phoneNumber" value={userData.phoneNumber} onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })} />
                    </div>

                    <div className="signup-group">
                        <label htmlFor="idCardNumber" className="signup-label">ID Card Number</label>
                        <input className="signup-input" type="text" id="idCardNumber" value={userData.idCardNumber} onChange={(e) => setUserData({ ...userData, idCardNumber: e.target.value })} />
                    </div>
                </div>

                <button onClick={update_info} className="signup-button">Update</button>
            </div>
        </>
    );
};

export default Profile;
