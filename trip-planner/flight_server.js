// app.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/flights', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define Flight Schema
const flightSchema = new mongoose.Schema({
    srcCity: String,
    destCity: String,
    flightCompany: String,
    price: Number,
    timeToTravel: String,
    departureTime: String,
    arrivalTime: String,
    logo: String,
    srcCity2: String,
    destCity2: String,
    departureTime2: String,
    arrivalTime2: String,
    timeToTravel2: String,
});

const Flight = mongoose.model('Flight', flightSchema);

const cities = ['Athens', 'Madrid', 'Barcelona', 'Rome', 'Milan', 'Amsterdam', 'Berlin', 'Heraklion', 'Paris', 'London', 'Tokyo', 'New York'];

const logos = ['aegean-logo.png', 'rynair-logo.png', 'sky-express-logo.png'];

const getRandomLogo = () => {
    const randomIndex = Math.floor(Math.random() * logos.length);
    return logos[randomIndex];
};

const convertTimeToMinutes = (time) => {
    const [hhmm, period] = time.split(' ');
    const [hours, minutes] = hhmm.split(':').map(Number);

    // Convert to 24-hour format
    const adjustedHours = period === 'PM' ? hours + 12 : hours;

    return adjustedHours * 60 + minutes;
};

const generateRandomTime = () => {
    const departureHours = Math.floor(Math.random() * 24);
    const departureMinutes = Math.floor(Math.random() * 60);

    // Generate a random duration between 2 and 8 hours and random minutes
    const durationHours = Math.floor(Math.random() * 7) + 2;
    const durationMinutes = Math.floor(Math.random() * 60);

    // Calculate arrival time
    const arrivalHours = (departureHours + durationHours) % 24;
    const arrivalMinutes = (departureMinutes + durationMinutes) % 60;

    const departureTime = `${departureHours < 10 ? '0' : ''}${departureHours}:${departureMinutes < 10 ? '0' : ''}${departureMinutes}`;
    const arrivalTime = `${arrivalHours < 10 ? '0' : ''}${arrivalHours}:${arrivalMinutes < 10 ? '0' : ''}${arrivalMinutes}`;

    return {
        departureTime: departureTime,
        arrivalTime: arrivalTime,
        duration: `${durationHours} hours ${durationMinutes} minutes`,
    };
};

const mockFlights = [];
for (let i = 0; i < 100; i++) {
    const randomSrcCity = cities[Math.floor(Math.random() * cities.length)];
    let randomDestCity;
    do {
        randomDestCity = cities[Math.floor(Math.random() * cities.length)];
    } while (randomDestCity === randomSrcCity);

    const randomFlightCompany = 'Airline' + i;
    const randomPrice = Math.floor(Math.random() * 501) + 100; // Random price between 100 and 600
    const randomTime = generateRandomTime();
    const randomTime2 = generateRandomTime();

    const randomMockEntry = {
        srcCity: randomSrcCity,
        destCity: randomDestCity,
        flightCompany: randomFlightCompany,
        price: randomPrice,
        timeToTravel: randomTime.duration,
        departureTime: randomTime.departureTime,
        arrivalTime: randomTime.arrivalTime,
        logo: getRandomLogo(),
        srcCity2: randomDestCity,
        destCity2: randomSrcCity,
        departureTime2: randomTime2.departureTime,
        arrivalTime2: randomTime2.arrivalTime,
        timeToTravel2: randomTime2.duration,
    };

    mockFlights.push(randomMockEntry);
}

// Insert mock data into MongoDB
Flight.insertMany(mockFlights)
    .then(() => {
        console.log('Mock data inserted successfully');
    })
    .catch((err) => {
        console.error('Error inserting mock data:', err);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
