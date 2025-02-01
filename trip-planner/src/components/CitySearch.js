// CitySearch.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Col } from 'react-bootstrap';
import './CitySearch.css';

const CitySearch = ({ onCitySelect }) => {
    const [query, setQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (value) => {
        try {
            const response = await fetch(
                `http://api.geonames.org/searchJSON?q=${value}&maxRows=5&username=kode&type=json&featureClass=P`
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setSuggestions(
                data.geonames.map((city) => ({
                    label: city.name,
                    value: city.name,
                }))
            );
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const onInputChange = (newValue) => {
        setQuery(newValue);
        fetchSuggestions(newValue);
    };

    const onSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        onCitySelect(selectedOption.value);
    };

    useEffect(() => {
        // Fetch suggestions when query changes
        fetchSuggestions(query);
    }, [query]);

    return (
        <Col id='something'>
            <Select
                options={suggestions}
                onInputChange={onInputChange}
                onChange={onSelectChange}
                value={selectedOption}
                placeholder="City"
            />
        </Col>
    );
};

export default CitySearch;
