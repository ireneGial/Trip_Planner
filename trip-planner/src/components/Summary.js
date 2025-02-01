import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding, faMapPin, faStar, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Summary = () => {
    const [flight, setFlight] = useState({});
    const [hotel, setHotel] = useState({});
    const [pois, setPois] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const sflight = localStorage.getItem("selectedFlight");
        setFlight(JSON.parse(sflight));
        const shotel = localStorage.getItem("selectedHotel");
        setHotel(JSON.parse(shotel));
        const spois = localStorage.getItem("pois");
        setPois(JSON.parse(spois));
        const simages = localStorage.getItem("images");
        setImages(JSON.parse(simages));
    }, []);

    return (
        <div>
            <Container>
                <Row>
                    <h3>Reserved Flights</h3>
                </Row>
            </Container>
            <Container>
                <Row>

                    {
                        !flight || !flight.logo ? (
                            <div className="text-center mt-5">
                                <p style={{ fontSize: '15px', textDecoration: 'underline' }}>Not selected flights</p>
                            </div>
                        ) : (
                            <Card>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={require(`./${flight.logo}`)}
                                                alt={`${flight.flightCompany} Logo`}
                                                style={{ width: '151px', height: '100px', marginRight: '10px' }}
                                            />
                                            <div>
                                                <Card.Title>{flight.srcCity}</Card.Title>
                                                <div>
                                                    <strong>Departure:</strong> {flight.departureTime}
                                                </div>
                                            </div>
                                        </div>
                                        <Card.Title className="text-center time">{flight.timeToTravel} <br></br> possible stop(s)</Card.Title>
                                        <div>
                                            <Card.Title className="text-right">{flight.destCity}</Card.Title>
                                            <div>
                                                <div>
                                                    <strong>Arrival:</strong> {flight.arrivalTime}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                </Card.Body>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={require(`./${flight.logo}`)}
                                                alt={`${flight.flightCompany} Logo`}
                                                style={{ width: '151px', height: '100px', marginRight: '10px' }}
                                            />
                                            <div>
                                                <Card.Title>{flight.srcCity2}</Card.Title>
                                                <div>
                                                    <strong>Departure:</strong> {flight.departureTime2}
                                                </div>
                                            </div>
                                        </div>
                                        <Card.Title className="text-center time">{flight.timeToTravel2} <br></br> possible stop(s)</Card.Title>
                                        <div>
                                            <Card.Title className="text-right">{flight.destCity2}</Card.Title>
                                            <div>
                                                <div>
                                                    <strong>Arrival:</strong> {flight.arrivalTime2}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                                <Card.Footer>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        Total Price: €{flight.price}
                                    </div>
                                </Card.Footer>
                            </Card>
                        )
                    }
                </Row>
                <br></br>
                <h3>Reserved Hotel</h3>
                {
                    !hotel || !hotel.logo ? (
                        <div className="text-center mt-5">
                            <p style={{ fontSize: '15px', textDecoration: 'underline' }}>Not selected hotels</p>
                        </div>
                    ) : (
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
                            <Card.Footer className='' style={{ width: '100%', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    Price: {hotel.price}
                                </div>
                            </Card.Footer>
                        </Card>
                    )}
                <br></br>
                <h3>Selected points of interest</h3>
                {!pois || pois.length === 0 ? (
                    <div className="text-center mt-5">
                        <p style={{ fontSize: '15px', textDecoration: 'underline' }}>Not selected points of interests</p>
                    </div>
                ) : (
                    <Row xs={12} md={3} lg={3} xl={3} xxl={3}>
                        {pois.map((poi, index) => (
                            <Col key={poi.fsq_id} className="mb-4">
                                <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>
                                    {images && images.length > 0 && (
                                        <Card.Img
                                            variant="top"
                                            src={`${images[index].prefix}original${images[index].suffix}`}
                                            alt="Hotel Logo"
                                            style={{ height: '200px', objectFit: 'cover' }}
                                        />
                                    )}

                                    <Card.Body style={{ backgroundColor: '#f8f9fa' }}>
                                        <Card.Title style={{ color: '#343a40' }}>{poi.name}</Card.Title>

                                        <Card.Text style={{ color: '#6c757d', textAlign: 'left' }}>
                                            <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                                            <strong> Address:</strong> {poi.location.address}
                                            <br />
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                            <strong> Distance:</strong> {poi.distance}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </div >
    );
};

export default Summary;
