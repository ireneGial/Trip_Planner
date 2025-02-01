import React, { useState, useEffect } from 'react';
import { Button, Col } from 'react-bootstrap';
import './Dashboard.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CitySearch from './CitySearch';
import Booking from './Booking';

const Dashboard = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [srcCity, setSrcCity] = useState(null);
    const [destCity, setDestCity] = useState(null);
    const [budget, setBudget] = useState(100);
    const [numPeople, setNumPeople] = useState(1);
    const [booking, setBooking] = useState("");
    const [error, setError] = useState('');
    const [pref, setPref] = useState({
        startDate: '',
        endDate: '',
        location: '',
        budget: '',
        numPeople: ''
    });

    const handleSearch = () => {

        if (srcCity === destCity) {
            setError('Source city and destination city cannot be the same.');
            return;
        }

        // Basic validation for dates
        if (!startDate || !endDate) {
            setError('Please select start and end dates.');
            return;
        }

        const startDateTime = new Date(startDate).getTime();
        const endDateTime = new Date(endDate).getTime();

        if (startDateTime > endDateTime) {
            setError('End date must be greater than or equal to start date.');
            return;
        }

        // Basic validation for budget
        if (isNaN(budget) || budget <= 0 || budget > 2000) {
            setError('Invalid budget. Please enter a valid budget between 0 and 2000.');
            return;
        }

        if (isNaN(numPeople) || numPeople < 1) {
            setError('Invalid number of people. Please enter a valid positive integer.');
            return;
        }

        setError("")

        setPref({
            startDate: startDate,
            endDateTime: endDate,
            srcCity: srcCity,
            destCity: destCity,
            budget: budget,
            numPeople: numPeople
        })
        setBooking(true)
    };

    const handleSrcCitySelect = (city) => {
        setSrcCity(city);
    };

    const handleDestCitySelect = (city) => {
        setDestCity(city);
    };

    return (
        <div className='bb'>

            {!booking ? (

                <><h1 style={{ color: "white" }}>Search for your next trip !</h1>
                    <Container>
                        <Row className="dashboard-container">

                            <Col>
                                <label>Source City</label>
                                <CitySearch onCitySelect={handleSrcCitySelect} />
                            </Col>
                            <Col>
                                <label>Dest City</label>
                                <CitySearch onCitySelect={handleDestCitySelect} />
                            </Col>

                            <Col>
                                <label>Start Date</label>
                                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                            </Col>

                            <Col>
                                <label>End Date</label>
                                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </Col>

                            <Col>
                                <label>People</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={numPeople}
                                    onChange={(e) => setNumPeople(parseInt(e.target.value))} />
                            </Col>

                            <Col>
                                <label>Total Budget</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="2000"
                                    step="1"
                                    value={budget}
                                    onChange={(e) => setBudget(parseInt(e.target.value))} />
                                <span>€{budget}</span>
                            </Col>

                            <Col>
                                <Button variant="primary" onClick={handleSearch}>
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    {error && <p className="error-message">{error}</p>}
                </>) : (
                <Booking searchObj={pref} />
            )}
        </div >
    );
};

export default Dashboard;
