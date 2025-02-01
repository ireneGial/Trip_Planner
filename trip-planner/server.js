const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 5001;

app.use(cors());
// First MongoDB connection for User model
mongoose.connect('mongodb://127.0.0.1:27017/auth', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', {
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    age: String,
    city: String,
    phoneNumber: String,
    idCardNumber: String,
});

// Second MongoDB connection for Flight model
const flightDBConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/flights', { useNewUrlParser: true, useUnifiedTopology: true });

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

const Flight = flightDBConnection.model('Flight', flightSchema);

// Second MongoDB connection for Flight model
const hotelDBConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/hotels', { useNewUrlParser: true, useUnifiedTopology: true });

const hotelSchema = new mongoose.Schema({
    hotelName: String,
    location: String,
    streetAndNumber: String,
    hostingPeople: String,
    price: String,
    stars: String,
    logo: String,
    distanceFromCenter: String,
});

const Hotel = hotelDBConnection.model('Hotel', hotelSchema);

// Second MongoDB connection for Flight model
const tripsDBConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/trips', { useNewUrlParser: true, useUnifiedTopology: true });

const tripsSchema = new mongoose.Schema({
    finalObj: Object
});

const Trips = tripsDBConnection.model('Trips', tripsSchema);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Signup endpoint
app.post('/api/signup/', async (req, res) => {
    const { username, password, firstName, lastName, age, city, phoneNumber, idCardNumber } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists. Choose a different one.' });
    }

    // Create a new user
    const newUser = new User({ username, password, firstName, lastName, age, city, phoneNumber, idCardNumber });
    await newUser.save();

    res.status(200).json({ message: 'Signup successful' });
});

// Login endpoint
app.post('/api/login/', async (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username, password });
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = user.username

    res.status(200).json({ token, message: 'Login successful' });
});

app.get('/api/user/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error retrieving user information:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/user/:username', async (req, res) => {
    const { username } = req.params;
    const updatedUserData = req.body;

    try {
        // Find the user by username and update the information
        const updatedUser = await User.findOneAndUpdate({ username }, updatedUserData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User information updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// app.get('/api/flights', async (req, res) => {
//     try {
//         const flights = await Flight.find();
//         res.json(flights);
//     } catch (error) {
//         console.error('Error fetching flights:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// Endpoint to get flights
app.get('/api/flights', async (req, res) => {
    try {
        // Get source and destination cities from query parameters
        const { srcCity, destCity } = req.query;

        // // Define a filter object based on source and destination cities
        const filter = {};
        if (srcCity) filter.srcCity = srcCity;
        if (destCity) filter.destCity = destCity;

        // Use the filter object in the Flight.find() query
        const flights = await Flight.find(filter);

        res.json(flights);
    } catch (error) {
        console.error('Error fetching flights:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define a new route to get hotels by location
app.get('/hotels/:location', async (req, res) => {
    const location = req.params.location;

    try {
        // Query the MongoDB database to find hotels with the specified location
        const hotels = await Hotel.find({ location });

        if (hotels.length === 0) {
            return res.status(404).json({ message: 'No hotels found for the specified location.' });
        }

        // Send the hotel data as JSON in the response
        res.json(hotels);
    } catch (error) {
        console.error('Error retrieving hotels:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/points/:destCity', async (req, res) => {
    const destCity = req.params.destCity;
    console.log(destCity);

    const sdk = require('api')('@fsq-developer/v1.0#1bptk2ulm82uhf0');

    sdk.auth('fsq3vyBPlAgW3id+rMiyPggv8aDnQLw9ZI5wksdEdPcNXqE=');
    sdk.placeSearch({ near: destCity, query: "sights", limit: "20" })
        .then(({ data }) => res.json(data))
        .catch(err => console.error(err));
});

app.post('/api/photos/', async (req, res) => {

    const sdk = require('api')('@fsq-developer/v1.0#1bptk2ulm82uhf0');

    const venueIds = req.body.extractedIds;
    const ids = venueIds.map((venueId) => venueId)

    console.log(ids)

    if (!ids || ids.length === 0) {
        return res.status(400).json({ error: 'Invalid or missing venue IDs' });
    }

    sdk.auth('fsq3vyBPlAgW3id+rMiyPggv8aDnQLw9ZI5wksdEdPcNXqE=');

    try {
        const photoRequests = ids.map((venueId) => sdk.placePhotos({ fsq_id: venueId }));
        const photoResponses = await Promise.all(photoRequests);

        // Extract relevant data from each response
        const photosData = photoResponses.map((response) => response.data);
        console.log(photosData)
        res.json(photosData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/storeData', async (req, res) => {
    const finalObj = req.body;
    console.log(finalObj)

    const newTrip = new Trips({ finalObj });
    await newTrip.save();

    res.status(200).json({ message: 'Data stored successfully' });
});


// Define a new route to get hotels by location
app.get('/trips/:user', async (req, res) => {
    const user = req.params.user
    console.log(user)

    try {
        // Query the MongoDB database to find hotels with the specified location
        const trips = await Trips.find({ 'finalObj.user': user });

        if (trips.length === 0) {
            return res.status(404).json({ message: 'No trip found for the specified location.' });
        }

        res.json(trips);
    } catch (error) {
        console.error('Error retrieving hotels:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to handle trip deletion
app.delete('/trips/:id', async (req, res) => {
    const tripId = req.params.id;

    try {
        // Use mongoose to find and delete the trip by ID
        const deletedTrip = await Trips.findByIdAndDelete({ '_id': tripId });

        if (!deletedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.status(200).json({ message: 'Trip deleted successfully' });
    } catch (error) {
        console.error('Error deleting trip:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

