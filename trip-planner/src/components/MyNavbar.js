import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyNavbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const MyNavbar = ({ isLoggedIn, currentUser }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload();
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary shadow">
            <Container>
                <Navbar.Brand href="/">Trip Planner</Navbar.Brand>
                {currentUser ? (
                    <Nav className="ml-auto">
                        <NavDropdown
                            title={currentUser}
                            id="basic-nav-dropdown"
                            style={{ position: 'absolute', right: 105, top: 10 }}
                        >
                            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/trips">My Trips</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                ) : null}
            </Container>
        </Navbar>
    );
};

export default MyNavbar;
