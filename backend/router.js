import express from "express";
import Trip from './Models/trips.js';
import Experience from './Models/experiences.js';

const routerTrips = express.Router();
const routerExperiences = express.Router();

// Create a new Trip
routerTrips.post('/', async (req, res) => {
    try {
        const { TripName, TripDescription } = req.body;

        const newTrip = new Trip({
            TripName,
            TripDescription,
            TripDays: []
        });

        await newTrip.save();
        res.status(201).json(newTrip);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to create new trip' });
    }
});

// Add Day to Trip
routerTrips.post('/:id/add-day', async (req, res) => {
    try {
        const tripId = req.params.id;
        const trip = await Trip.findById(tripId);
        const newDayNumber = trip.TripDays.length + 1;

        const newDay = {
            DayNumber: newDayNumber,
            DayExperiences: []
        };

        trip.TripDays.push(newDay);
        await trip.save();

        const newDayId = trip.TripDays[trip.TripDays.length - 1]._id;
        res.status(201).json(newDayId);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to add day to trip' });
    }
});

// View Day of a Trip
routerTrips.get('/:tripId/:dayId', async (req, res) => {
    try {
        const tripId = req.params.tripId;
        const dayId = req.params.dayId;
        const trip = await Trip.findById(tripId);
        const day = trip.TripDays.find(day => day._id.toString() === dayId);
       res.status(200).json(day);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to find day of this trip'});
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
        res.status(500).json({ 'Error': 'Unable to find trip'});
    }
});

// Update Trip
routerTrips.put('/:id', async (req, res) => {
    try {
        const { TripName, TripDescription } = req.body;

        const updatedTrip = await Trip.findByIdAndUpdate(
            req.params.id,
            { TripName, TripDescription },
            { new: true });

        if (updatedTrip) {
            res.status(200).json(updatedTrip);
        } else {
            res.status(404).json({ error: 'Trip not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to update trip' });
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

// Get all experiences 
routerExperiences.get('/', async (req, res) => {
    try {
        const ex = await Experience.find({});
        res.status(200).json(ex);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to get experiences' });
    }
});

// Get an Experience by ID
routerExperiences.get('/:id', async (req, res) => {
    try {
        const exp = await Experience.findById(req.params.id);
        res.status(200).json(exp);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to find experience'});
    }
});

// Create a new Experience
routerExperiences.post('/', async (req, res) => {
    try {
        const { ExpName, ExpDescription } = req.body;

        const newExp = new Experience({
            ExpName,
            ExpDescription
        });

        await newExp.save();
        res.status(201).json(newExp);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to create new experience' });
    }
});

// Add an Experience to a Day of a Trip
routerTrips.post('/:tripId/:dayId/:expId', async (req, res) => {
    try {
        const { tripId, dayId, expId } = req.params;
        console.log(tripId);
        console.log(dayId);
        console.log(expId);

        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ 'Error': 'Trip not found' });
        }

        const day = trip.TripDays.find(day => day._id.toString() === dayId);
        if (!day) {
            return res.status(404).json({ 'Error': 'Day not found' });
        }

        // Add the experience ID to the day's experiences array
        day.DayExperiences.push(expId);

        // Save the trip with the updated day
        await trip.save();

        res.status(201).json(trip);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to add experience to day' });
    }
});


// Update Experience
routerExperiences.put('/:id', async (req, res) => {
    try {
        const { ExpName, ExpDescription } = req.body;

        const updatedExp = await Experience.findByIdAndUpdate(
            req.params.id,
            { ExpName, ExpDescription },
            { new: true });

        if (updatedExp) {
            res.status(200).json(updatedExp);
        } else {
            res.status(404).json({ error: 'Experience not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to update experience' });
    }
});

// Delete an Experience
routerExperiences.delete('/:id', async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to delete experience'});
    }
});

export { routerTrips, routerExperiences };
