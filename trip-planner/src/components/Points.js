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

const BASE_URL = 'https://api.foursquare.com/v2/venues/explore';
const CLIENT_ID = 'WE52XEJVMTVR4O2EW0FCQFCWVZFO2AFGDXSKPTGPJYZQDQUZ';
const CLIENT_SECRET = 'fsq32O/3R8L8HKD0RU0ECKUqg3xIHhODvr27+Loi/+3yQiA=';
const VERSION = '20220101';

const Points = ({ searchObj }) => {

    const [sights, setSights] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [selectedPois, setSelectedPois] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    const handlePoiSelect = (poi, image) => {
        // Check if the POI is already selected
        const isPoiSelected = selectedPois.includes(poi);
        const isImageSelected = selectedImages.includes(image);


        setSelectedPois((prevSelectedPois) => {
            let updatedPois;

            if (isPoiSelected) {
                // If POI is already selected, remove it
                updatedPois = prevSelectedPois.filter((selectedPoi) => selectedPoi !== poi);
            } else {
                updatedPois = [...prevSelectedPois, poi];
            }

            // Update local storage
            localStorage.setItem('pois', JSON.stringify(updatedPois));

            return updatedPois;
        });

        setSelectedImages((prevSelectedImages) => {
            let updatedImages;
            if (isImageSelected) {
                updatedImages = prevSelectedImages.filter((selectedImage) => selectedImage !== image);
            } else {
                updatedImages = [...prevSelectedImages, image];
            }

            localStorage.setItem('images', JSON.stringify(updatedImages));
            return updatedImages;
        });
    };

    useEffect(() => {
        fetch(`http://localhost:5001/points/${searchObj.destCity}`)
            .then((response) => response.json())
            .then((data) => {
                setSights(data.results);

                const extractedIds = data.results.map((item) => item.fsq_id);

                // Return the second fetch promise
                return fetch('http://localhost:5001/api/photos/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ extractedIds }),
                });
            })
            .then((response) => response.json())
            .then((data) => {
                setPhotos(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }, []);


    return (
        <Container>
            {sights.length === 0 ? (
                <div className="text-center mt-5">
                    <h3>Please wait...</h3>
                </div>
            ) : (
                <Row xs={12} md={3} lg={3} xl={3} xxl={3}>
                    {sights.map((poi, index) => (
                        <Col key={poi.fsq_id} className="mb-4">
                            <Card style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}>
                                {photos[index] && photos[index].length > 0 && (
                                    <Card.Img
                                        variant="top"
                                        src={`${photos[index][0].prefix}original${photos[index][0].suffix}`}
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
                                <Card.Footer className="" style={{ borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <Button
                                            variant={selectedPois.includes(poi) ? 'success' : 'primary'}
                                            onClick={() => handlePoiSelect(poi, photos[index][0])}
                                        >
                                            {selectedPois.includes(poi) ? 'Selected' : 'Select'}
                                        </Button>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );

};

export default Points;
