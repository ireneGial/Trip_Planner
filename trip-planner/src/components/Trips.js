import React, { useState, useEffect } from 'react';
import MyNavbar from './MyNavbar';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding, faMapPin, faStar, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import './Trips.css';

const DeleteSuccessMessage = ({ onClose }) => (
    <div className="alert alert-success" role="alert">
        Trip deleted successfully.
        <button type="button" className="close" onClick={onClose} aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
);

const TripCard = ({ trip, onDeleteSuccess }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

    const handleDeleteTrip = () => {
        // Make a DELETE request to your server endpoint to delete the trip
        axios.delete(`http://localhost:5001/trips/${trip._id}`)
            .then(response => {
                // Handle success (e.g., update state or fetch updated trips)
                console.log('Trip deleted successfully');
                setShowDeleteSuccess(true);
                onDeleteSuccess();
            })
            .catch(error => {
                // Handle error
                console.error('Error deleting trip:', error.message);
            });
    };

    const handleCloseDeleteSuccess = () => setShowDeleteSuccess(false);


    return (
        <>
            <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>
                <Card.Header style={{ textAlign: "center" }}>
                    <Card.Title style={{ color: '#343a40' }}>{JSON.parse(trip.finalObj.flights).destCity} on {trip.finalObj.searchObj.startDate}</Card.Title>
                </Card.Header>
                <Card.Body style={{ backgroundColor: '#f8f9fa' }}>
                    <Card.Img
                        variant="top"
                        src={require(`./${JSON.parse(trip.finalObj.hotels).logo}`)}
                        alt="Hotel Logo"
                        style={{ height: '200px', objectFit: 'cover' }}
                    />
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={handleOpenModal}>Open</button>
                    <button className="btn btn-danger" onClick={handleDeleteTrip}>Delete</button>
                </Card.Footer>
                {showDeleteSuccess && <DeleteSuccessMessage onClose={handleCloseDeleteSuccess} />}

            </Card>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Dialog style={{ width: '60vw !important' }}>

                    <Modal.Header closeButton>
                        <Modal.Title>Trip Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <Container>
                                <Row>
                                    <h3>Reserved Flights</h3>
                                </Row>
                            </Container>
                            <Container>
                                <Row>

                                    {
                                        !JSON.parse(trip.finalObj.flights) || !JSON.parse(trip.finalObj.flights).logo ? (
                                            <div className="text-center mt-5">
                                                <p style={{ fontSize: '15px', textDecoration: 'underline' }}>Empty</p>
                                            </div>
                                        ) : (
                                            <Card>
                                                <Card.Body>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                src={require(`./${JSON.parse(trip.finalObj.flights).logo}`)}
                                                                alt={`${JSON.parse(trip.finalObj.flights).flightCompany} Logo`}
                                                                style={{ width: '151px', height: '100px', marginRight: '10px' }}
                                                            />
                                                            <div>
                                                                <Card.Title>{JSON.parse(trip.finalObj.flights).srcCity}</Card.Title>
                                                                <div>
                                                                    <strong>Departure:</strong> {JSON.parse(trip.finalObj.flights).departureTime}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Card.Title className="text-center time">{JSON.parse(trip.finalObj.flights).timeToTravel} <br></br> possible stop(s)</Card.Title>
                                                        <div>
                                                            <Card.Title className="text-right">{JSON.parse(trip.finalObj.flights).destCity}</Card.Title>
                                                            <div>
                                                                <div>
                                                                    <strong>Arrival:</strong> {JSON.parse(trip.finalObj.flights).arrivalTime}
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
                                                                src={require(`./${JSON.parse(trip.finalObj.flights).logo}`)}
                                                                alt={`${JSON.parse(trip.finalObj.flights).flightCompany} Logo`}
                                                                style={{ width: '151px', height: '100px', marginRight: '10px' }}
                                                            />
                                                            <div>
                                                                <Card.Title>{JSON.parse(trip.finalObj.flights).srcCity2}</Card.Title>
                                                                <div>
                                                                    <strong>Departure:</strong> {JSON.parse(trip.finalObj.flights).departureTime2}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Card.Title className="text-center time">{JSON.parse(trip.finalObj.flights).timeToTravel2} <br></br> possible stop(s)</Card.Title>
                                                        <div>
                                                            <Card.Title className="text-right">{JSON.parse(trip.finalObj.flights).destCity2}</Card.Title>
                                                            <div>
                                                                <div>
                                                                    <strong>Arrival:</strong> {JSON.parse(trip.finalObj.flights).arrivalTime2}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        Total Price: €{JSON.parse(trip.finalObj.flights).price}
                                                    </div>
                                                </Card.Footer>
                                            </Card>
                                        )
                                    }
                                </Row>
                                <br></br>
                                <h3>Reserved Hotel</h3>
                                {
                                    !JSON.parse(trip.finalObj.hotels) || !JSON.parse(trip.finalObj.hotels).logo ? (
                                        <div className="text-center mt-5">
                                            <p style={{ fontSize: '15px', textDecoration: 'underline' }}>Empty</p>
                                        </div>
                                    ) : (
                                        <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>

                                            <Card.Header style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}>
                                                <Card.Title style={{ color: '#343a40' }}>{JSON.parse(trip.finalObj.hotels).hotelName}</Card.Title>
                                            </Card.Header>

                                            <Card.Img
                                                variant="top"
                                                src={require(`./${JSON.parse(trip.finalObj.hotels).logo}`)} // Placeholder image URL
                                                alt="Hotel Logo"
                                                style={{ height: '200px', objectFit: 'cover' }}
                                            />
                                            <Card.Body style={{ backgroundColor: '#f8f9fa' }}>
                                                <Card.Text style={{ color: '#6c757d', textAlign: 'left' }}>
                                                    <FontAwesomeIcon icon={faStar} className="mr-2" />
                                                    <strong> Stars:</strong> {JSON.parse(trip.finalObj.hotels).stars}
                                                    <br />
                                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                                                    <strong> Location:</strong> {JSON.parse(trip.finalObj.hotels).location}
                                                    <br />
                                                    <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                                                    <strong> Street:</strong> {JSON.parse(trip.finalObj.hotels).streetAndNumber}
                                                    <br />
                                                    <FontAwesomeIcon icon={faMapPin} className="mr-2" />
                                                    <strong> From Center:</strong> {JSON.parse(trip.finalObj.hotels).distanceFromCenter}
                                                    <br />
                                                </Card.Text>
                                            </Card.Body>
                                            <Card.Footer className='' style={{ width: '100%', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    Price: {JSON.parse(trip.finalObj.hotels).price}
                                                </div>
                                            </Card.Footer>
                                        </Card>
                                    )}
                                <br></br>
                                <h3>Selected points of interest</h3>
                                {JSON.parse(trip.finalObj.pois).length === 0 ? (
                                    <div className="text-center mt-5">
                                        <p style={{ fontSize: '15px', textDecoration: 'underline' }}>Empty</p>
                                    </div>
                                ) : (
                                    <Row xs={12} md={2} lg={4} xl={2} xxl={3}>
                                        {JSON.parse(trip.finalObj.pois).map((poi, index) => (
                                            <Col key={poi.fsq_id} className="mb-4">
                                                <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>
                                                    {JSON.parse(trip.finalObj.setImages) && JSON.parse(trip.finalObj.setImages).length > 0 && (
                                                        <Card.Img
                                                            variant="top"
                                                            src={`${JSON.parse(trip.finalObj.setImages)[index].prefix}original${JSON.parse(trip.finalObj.setImages)[index].suffix}`}
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal >
        </>
    );
};

const Trips = () => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const user = localStorage.getItem("user");
        localStorage.clear();
        localStorage.setItem("user", user);

        axios.get(`http://localhost:5001/trips/${localStorage.getItem("user")}`)
            .then(response => {
                const trips = response.data;
                setTrips(trips);
                console.log(trips);
            })
            .catch(error => {
                console.error('Error fetching trips:', error.message);
            });
    }, []);

    return (
        <div>
            <MyNavbar isLoggedIn={Boolean(localStorage.getItem("user"))} currentUser={localStorage.getItem("user")} />
            {trips.length === 0 ? (
                <div className="text-center mt-5">
                    <h3>No trips</h3>
                </div>
            ) : (
                <Container style={{ width: '100%', height: '100%', padding: '30px 10px' }}>
                    <Row xs={12} md={2} lg={3} xl={3} xxl={3}>
                        {trips.map((trip) => (
                            <Col key={trip._id} className="mb-4">
                                <TripCard trip={trip} onDeleteSuccess={() => setTrips(trips.filter(t => t._id !== trip._id))} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}
        </div>
    );
};

export default Trips;
