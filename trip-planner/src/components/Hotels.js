import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding, faMapPin, faStar, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import axios from 'axios';



const Hotels = ({ searchObj }) => {

    library.add(faMapMarkerAlt, faBuilding, faMapPin, faStar, faMoneyBill);

    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5001/hotels/${searchObj.destCity}`)
            .then(response => {
                // Handle the hotel data from the response
                const hotels = response.data;
                setHotels(hotels)
                console.log('Hotels:', hotels);
            })
            .catch(error => {
                // Handle errors
                console.error('Error fetching hotels:', error.message);
            });
    }, []);

    const handleSelectHotel = (flight) => {
        // Check if the flight is already selected
        const isFlightSelected = selectedHotel === flight;

        // Update the state
        setSelectedHotel(isFlightSelected ? null : flight);

        // Save the selected flight to local storage
        saveSelectedFlightToLocalStorage(isFlightSelected ? null : flight);
    };

    // Function to save the selected flight to local storage
    const saveSelectedFlightToLocalStorage = (flight) => {
        localStorage.setItem('selectedHotel', JSON.stringify(flight));
    };

    return (
        <Container>
            <Row xs={12} md={2} lg={3} xl={3} xxl={3}>
                {hotels.map((hotel) => (
                    <Col key={hotel._id} className="mb-4">
                        <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>

                            <Card.Header style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                                <Card.Title style={{ color: '#343a40' }}>{hotel.hotelName}</Card.Title>
                            </Card.Header>

                            <Card.Img
                                variant="top"
                                src={require(`./${hotel.logo}`)} // Placeholder image URL
                                alt="Hotel Logo"
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            <Card.Body style={{ backgroundColor: '#f8f9fa' }}>
                                <Card.Text style={{ color: '#6c757d', textAlign: 'left' }}>
                                    <FontAwesomeIcon icon={faStar} className="mr-2" />
                                    <strong> Stars:</strong> {hotel.stars}
                                    <br />
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                    <strong> Location:</strong> {hotel.location}
                                    <br />
                                    <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                                    <strong> Street:</strong> {hotel.streetAndNumber}
                                    <br />
                                    <FontAwesomeIcon icon={faMapPin} className="mr-2" />
                                    <strong> From Center:</strong> {hotel.distanceFromCenter}
                                    <br />
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className='' style={{ borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                                <div className='d-flex justify-content-between align-items-center'>

                                    <Button
                                        variant={selectedHotel === hotel ? 'success' : 'primary'}
                                        onClick={() => handleSelectHotel(hotel)}
                                    >
                                        {selectedHotel === hotel ? 'Selected' : 'Select'}
                                    </Button>
                                    Price: €{hotel.price.replace("€", "")}
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Hotels;
