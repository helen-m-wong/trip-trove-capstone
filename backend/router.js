import express from "express";
import Trip from './Models/trips.js';


const routerTrips = express.Router();

// Create a new Trip
routerTrips.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const { TripName, TripStartDate, TripEndDate, TripFlights, TripCars, TripAccommodations, TripExperiences } = req.body;

        const newTrip = new Trip({
            TripName,
            TripStartDate,
            TripEndDate,
            TripFlights,
            TripCars,
            TripAccommodations,
            TripExperiences
        });

        await newTrip.save();
        res.status(201).json(newTrip);

    } catch (error) {
        console.log('Error creating new Trip');
        console.log(error);
    }
});

export default routerTrips;
