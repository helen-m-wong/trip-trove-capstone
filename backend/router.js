import express from "express";
import Trip from './Models/trips.js';
import Experience from './Models/experiences.js';
import { checkJwt } from './auth.js';

const routerTrips = express.Router();
const routerExperiences = express.Router();

// Public Routes

// Get all Trips or search Trips by name
routerTrips.get('/', async (req, res) => {
    try {
        const { name } = req.query;

        let trips;
        if (name) {
            const regex = new RegExp(name, 'i'); // Case-insensitive search
            trips = await Trip.find({ TripName: { $regex: regex } });
        } else {
            trips = await Trip.find({});
        }

        res.status(200).json(trips);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to get trips' });
    }
});

// Get a Trip by ID
routerTrips.get('/:id', async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id).populate({
            path: 'TripDays.DayExperiences',
            model: 'Experience'
        });
        res.status(200).json(trip);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to find trip'});
    }
});


// Get all experiences, performs search if there is a query
routerExperiences.get('/', async (req, res) => {
    try {
        const { keyword } = req.query;

        if (keyword) {
            // Case-insensitive search
            const regex = new RegExp(keyword, 'i');

            // Find experiences where the name or description matches the keyword
            const experiences = await Experience.find({
                $or: [
                    { ExperienceName: { $regex: regex } },
                    { ExperienceDescription: { $regex: regex } }
                ]
            });

            res.status(200).json(experiences);
        } else {
            // Return all experiences if no keyword provided
            const allExperiences = await Experience.find({});
            res.status(200).json(allExperiences);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ 'Error': 'Unable to fetch experiences' });
    }
});

// Get an Experience by ID
routerExperiences.get('/:id', async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        res.status(200).json(experience);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to find experience'});
    }
});

// Private Routes (requires authentication)

// Get Trips created by this user
routerTrips.get('/user/:userId', checkJwt, async (req, res) => {
    try {
        // Extract user ID 
        const userId = req.auth.sub.split('|')[1];

        // Find trips created by the specified user
        const trips = await Trip.find({ userId });
        if (trips.length === 0) {
            return res.status(404).json({ 'Error': 'No trips found for the specified user' });
        }
        res.status(200).json(trips);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Internal server error' });
    }
});

// Create a new Trip
routerTrips.post('/', checkJwt, async (req, res) => {
    try {
        const { TripName, TripDescription, TripImage } = req.body;
        const userId = req.auth.sub.split('|')[1];

        const newTrip = new Trip({
            TripName,
            TripDescription,
            TripDays: [],
            TripImage,
            userId
        });
        
        await newTrip.save();
        res.status(201).json(newTrip);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to create new trip' });
    }
});

// Add Day to Trip
routerTrips.post('/:id/add-day', checkJwt, async (req, res) => {
    try {
        const tripId = req.params.id;
        const trip = await Trip.findById(tripId);
        const userId = req.auth.sub.split('|')[1];

        if (!trip) {
            return res.status(404).json({ 'Error': 'Trip not found' });
        }
        if (trip.userId !== userId) {
            return res.status(403).json({ 'Error': 'You are not authorized to add a day to this trip' });
        }

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

// Update Trip
routerTrips.put('/:id', checkJwt, async (req, res) => {
    try {
        const userId = req.auth.sub.split('|')[1];
        const { TripName, TripDescription, TripImage } = req.body;

        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ 'Error': 'Trip not found' });
        }
        if (trip.userId !== userId) {
            return res.status(403).json({ 'Error': 'Forbidden: You are not allowed to edit this trip' });
        }

        trip.TripName = TripName;
        trip.TripDescription = TripDescription;
        trip.TripImage = TripImage;
        const updatedTrip = await trip.save();
        res.status(200).json(updatedTrip);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to update trip' });
    }
});

// Delete a Trip
routerTrips.delete('/:id', checkJwt, async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        const userId = req.auth.sub.split('|')[1];

        if (!trip) {
            return res.status(404).json({ 'Error': 'Trip not found' });
        }
        if (trip.userId !== userId) {
            return res.status(403).json({ 'Error': 'Forbidden: You are not allowed to delete this trip' });
        }

        await Trip.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to delete trip'});
    }
});

// Delete the most recently added Day from a Trip
routerTrips.delete('/:tripId/delete-day', checkJwt, async (req, res) => {
    try {
        const { tripId } = req.params;
        const userId = req.auth.sub.split('|')[1];

        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ 'Error': 'Trip not found' });
        }
        if (trip.userId !== userId) {
            return res.status(403).json({ 'Error': 'You are not authorized to delete a day from this trip' });
        }
        if (trip.TripDays.length === 0) {
            return res.status(404).json({ 'Error': 'No days found in the trip' });
        }

        trip.TripDays.pop();
        await trip.save();
        res.status(204).json(trip);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to delete day from trip' });
    }
});

// Create a new Experience
routerExperiences.post('/', checkJwt, async (req, res) => {
    try {
        const { ExperienceName, ExperienceDescription, ExperienceImage } = req.body;
        const userId = req.auth.sub.split('|')[1];

        const newExperience = new Experience({
            ExperienceName,
            ExperienceDescription,
            ExperienceImage,
            userId
        });

        await newExperience.save();
        res.status(201).json(newExperience);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to create new experience' });
    }
});

// Update Experience
routerExperiences.put('/:id', checkJwt, async (req, res) => {
    try {
        const userId = req.auth.sub.split('|')[1];
        const { ExperienceName, ExperienceDescription, ExperienceImage } = req.body;
        
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ 'Error': 'Experience not found' });
        }
        if (experience.userId !== userId) {
            return res.status(403).json({ 'Error': 'You are not authorized to update this experience' });
        }

        experience.ExperienceName = ExperienceName;
        experience.ExperienceDescription = ExperienceDescription;
        experience.ExperienceImage = ExperienceImage;
        const updatedExp = await experience.save();
        res.status(200).json(updatedExp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to update experience' });
    }
});

// Delete an Experience (removes Experience from DayExperiences arrays)
routerExperiences.delete('/:id', checkJwt, async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        const userId = req.auth.sub.split('|')[1];

        if (!experience) {
            return res.status(404).json({ 'Error': 'Experience not found' });
        }
        if (experience.userId !== userId) {
            return res.status(403).json({ 'Error': 'Forbidden: You are not allowed to delete this experience' });
        }

        await Experience.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to delete experience'});
    }
});

// Add an Experience to a Day of a Trip
routerTrips.post('/:tripId/:dayId/:expId', checkJwt, async (req, res) => {
    try {
        const { tripId, dayId, expId } = req.params;
        const userId = req.auth.sub.split('|')[1];

        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ 'Error': 'Trip not found' });
        }
        if (trip.userId !== userId) {
            return res.status(403).json({ 'Error': 'You are not authorized to add an experience to this trip' });
        }

        const day = trip.TripDays.find(day => day._id.toString() === dayId);
        if (!day) {
            return res.status(404).json({ 'Error': 'Day not found' });
        }

        // Add experience ID to the day's experiences array
        day.DayExperiences.push(expId);
        await trip.save();
        res.status(201).json(day);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to add experience to day' });
    }
});

// Delete an Experience from a Day of a Trip (doesn't delete Experience)
routerTrips.delete('/:tripId/:dayId/:expId', checkJwt, async (req, res) => {
    try {
        const { tripId, dayId, expId } = req.params;
        const userId = req.auth.sub.split('|')[1];

        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ 'Error': 'Trip not found' });
        }
        if (trip.userId !== userId) {
            return res.status(403).json({ 'Error': 'You are not authorized to add an experience to this trip' });
        }

        const day = trip.TripDays.find(day => day._id.toString() === dayId);
        if (!day) {
            return res.status(404).json({ 'Error': 'Day not found' });
        }

        // Check if the  experience exists in the day's experiences array
        const index = day.DayExperiences.indexOf(expId);
        if (index === -1) {
            return res.status(404).json({ 'Error': 'Experience not found in the day' });
        }

        day.DayExperiences.splice(index, 1);
        await trip.save();
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to delete experience from day' });
    }
});

// Move an Experience from one Day of a Trip to another
routerTrips.put('/:tripId/:dayId1/:dayId2/:expId', checkJwt, async (req, res) => {
    try {
        const { tripId, dayId1, dayId2, expId } = req.params;
        const userId = req.auth.sub.split('|')[1];
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ 'Error': 'Trip not found' });
        }
        if (trip.userId !== userId) {
            return res.status(403).json({ 'Error': 'Forbidden: You are not allowed to move experiences in this trip' });
        }
        if (dayId1 === dayId2) {
            return res.status(400).json({ 'Error': 'Source and destination days cannot be the same'});
        }
        // Retrieve day info from TripDays array of trip and check their existence
        const day1 = trip.TripDays.find(day => day._id.toString() === dayId1);
        const day2 = trip.TripDays.find(day => day._id.toString() === dayId2);
        if (!day1 || !day2) {
            return res.status(404).json({ 'Error': 'One or both days not found' });
        }

        // Find index of experience in the DayExperiences array
        const index = day1.DayExperiences.indexOf(expId);
        if (index === -1) {
            return res.status(404).json({ 'Error': 'Experience not found in the specified day' });
        }
        // Removes experience from day1 array 
        const experience = day1.DayExperiences.splice(index, 1)[0];
        // Adds experiences to day2 array
        day2.DayExperiences.push(experience);
        await trip.save();
        res.status(200).json(trip);
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to move experience' });
    }
  });
  
export { routerTrips, routerExperiences };
