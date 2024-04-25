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
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to create new trip' });
    }
});

// Get all Trips
routerTrips.get('/', async (req, res) => {
    try {
        const trips = await Trip.find({});
        res.status(200).json(trips);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to get trips' });
    }
});

// Get a Trip by ID
routerTrips.get('/:id', async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        res.status(200).json(trip);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to find trip with this id'});
    }
});

// Update a Trip
routerTrips.put('/:id', async (req, res) => {
    try {
        const { TripName, TripStartDate, TripEndDate, TripFlights, TripCars, TripAccommodations, TripExperiences } = req.body;
        const updateProps = {
            TripName,
            TripStartDate,
            TripEndDate,
            TripFlights,
            TripCars,
            TripAccommodations,
            TripExperiences
        };
        const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, updateProps, { new: true });
        res.status(200).json(updatedTrip);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to update trip'});
    }
});

// Delete a Trip
routerTrips.delete('/:id', async (req, res) => {
    try {
        await Trip.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to delete trip'});
    }
});

export default routerTrips;
