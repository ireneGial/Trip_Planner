import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import './Flights.css';
import Button from 'react-bootstrap/Button';

// Your functional component
function Flights({ searchObj }) {

    const [rendFlights, setRendFlights] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState({});

    const selectFlight = (flight) => {
        // Check if the flight is already selected
        const isFlightSelected = selectedFlight === flight;

        // Update the state
        setSelectedFlight(isFlightSelected ? null : flight);

        // Save the selected flight to local storage
        saveSelectedFlightToLocalStorage(isFlightSelected ? null : flight);
    };

    // Function to save the selected flight to local storage
    const saveSelectedFlightToLocalStorage = (flight) => {
        localStorage.setItem('selectedFlight', JSON.stringify(flight));
    };


    useEffect(() => {
        fetch(`http://localhost:5001/api/flights?srcCity=${searchObj.srcCity}&destCity=${searchObj.destCity}`)
            .then((response) => response.json())
            .then((data) => setRendFlights(data))
            .catch((error) => console.error('Error fetching flights:', error));
    }, []);

    return (
        <div className='flight-page'>
            {rendFlights.map((flight) => (
                <ListGroup.Item key={flight._id}>
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
                                <Button
                                    variant={selectedFlight === flight ? 'success' : 'primary'}
                                    onClick={() => selectFlight(flight)}
                                >
                                    {selectedFlight === flight ? 'Selected' : 'Select'}
                                </Button>
                                Total Price: €{flight.price}
                            </div>
                        </Card.Footer>
                    </Card>
                </ListGroup.Item>
            ))}
        </div >
    );
}

export default Flights;
