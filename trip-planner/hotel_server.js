// app.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hotels', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

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

const Hotel = mongoose.model('Hotel', hotelSchema);


const cities = ['Athens', 'Madrid', 'Barcelona', 'Rome', 'Milan', 'Amsterdam', 'Berlin', 'Heraklion', 'Paris', 'London', 'Tokyo', 'New York'];

const logos = [
    'hotel-logo-1.jpg', 'hotel-logo-2.jpg', 'hotel-logo-3.jpg', 'hotel-logo-4.jpg', 'hotel-logo-5.jpg',
    'hotel-logo-6.jpg', 'hotel-logo-7.jpg', 'hotel-logo-8.jpg', 'hotel-logo-9.jpg', 'hotel-logo-10.jpg'
];

const getRandomLogo = () => {
    const randomIndex = Math.floor(Math.random() * logos.length);
    return logos[randomIndex];
};

const generateRandomHotel = () => {
    const cityName = cities[Math.floor(Math.random() * cities.length)];
    const hotelPrefixes = ['Grand', 'Luxury', 'Central', 'Elegant', 'Royal', 'Modern', 'Charming', 'City View', 'Harbor', 'Tranquil'];

    let hotelName, streetAndNumber;

    do {
        hotelName = `${getRandomPrefix(hotelPrefixes)} ${getRandomHotelName()}`;
    } while (mockHotels.some(hotel => hotel.hotelName === hotelName));

    do {
        streetAndNumber = `${getRandomStreet(cityName)}, ${Math.floor(Math.random() * 100) + 1}`;
    } while (mockHotels.some(hotel => hotel.streetAndNumber === streetAndNumber));

    const hostingPeople = `Double Room for ${Math.floor(Math.random() * 2) + 1}`;
    const price = `${Math.floor(Math.random() * 150) + 50}€`;
    const stars = Math.floor(Math.random() * 3) + 3; // More 3 and 4-star hotels
    const logo = getRandomLogo();
    const distanceFromCenter = `${Math.floor(Math.random() * 10) + 1} km`;

    return {
        hotelName,
        location: cityName,
        streetAndNumber,
        hostingPeople,
        price,
        stars,
        logo,
        distanceFromCenter,
    };
};

const getRandomPrefix = (prefixes) => {
    const randomIndex = Math.floor(Math.random() * prefixes.length);
    return prefixes[randomIndex];
};

const getRandomHotelName = () => {
    // You can add more common hotel name elements here
    const hotelNameElements = [
        'Residence', 'Palace', 'Suites', 'Manor', 'Court', 'Inn', 'Lodge', 'Retreat', 'Mansion', 'Plaza',
        'Tower', 'Harbor View', 'Oasis', 'Garden', 'Haven', 'Cottage', 'Skyline', 'Paradise', 'Crown',
        'Boutique', 'Pinnacle', 'Sunrise', 'Moonlight', 'Grandview', 'Regency', 'Serenity', 'Epic',
        'Elite', 'Vista', 'Whispering', 'Cascade', 'Majestic', 'Eclipse', 'Summit', 'Riviera', 'Crimson',
        'Prestige', 'Elysium', 'Celestial', 'Empire', 'Windsor', 'Radiance', 'Aurora', 'Ritz', 'Astral',
        'Solstice', 'Prestige', 'Renaissance'
    ];
    const randomIndex = Math.floor(Math.random() * hotelNameElements.length);
    return hotelNameElements[randomIndex];
};

const getRandomStreet = (cityName) => {
    // You can implement logic here to get realistic street names based on the city
    // For simplicity, let's use generic street names for now
    const streets = [
        'Main Street', 'Park Avenue', 'Broadway', 'Market Street', 'Ocean Drive', 'Sunset Boulevard',
        'Maple Avenue', 'Pine Street', 'Cedar Lane', 'Lakeview Terrace', 'Springfield Road', 'Winding Way',
        'Sycamore Street', 'Rosewood Lane', 'Evergreen Avenue', 'Highland Drive', 'Magnolia Lane',
        'Hillcrest Road', 'Willow Street', 'Linden Avenue', 'Cherry Lane', 'Peachtree Street', 'Greenwood Avenue',
        'Ivy Lane', 'Brookside Drive', 'Cypress Lane', 'Chestnut Street', 'Holly Lane', 'Silverado Drive',
        'Bluebell Lane', 'Redwood Avenue', 'Meadow Lane', 'Daisy Lane', 'Cobblestone Lane', 'Victory Lane',
        'Wisteria Lane', 'Magnolia Avenue', 'Sunflower Street', 'Birch Lane', 'Juniper Street',
        'Acorn Avenue', 'Poplar Street', 'Tulip Lane', 'Sapphire Street', 'Emerald Avenue', 'Ruby Lane'
    ]; const randomIndex = Math.floor(Math.random() * streets.length);
    return streets[randomIndex];
};

const mockHotels = [];
for (let i = 0; i < 50; i++) {
    const randomHotel = generateRandomHotel();
    mockHotels.push(randomHotel);
}

// Insert mock data into MongoDB
Hotel.insertMany(mockHotels)
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