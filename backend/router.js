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

// Delete the most recently added Day from a Trip
routerTrips.delete('/:tripId/delete-day', async (req, res) => {
    try {
        const { tripId } = req.params;
        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ 'Error': 'Trip not found' });
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

// Create a new Experience
routerExperiences.post('/', async (req, res) => {
    try {
        const { ExperienceName, ExperienceDescription } = req.body;

        const newExperience = new Experience({
            ExperienceName,
            ExperienceDescription
        });

        await newExperience.save();
        res.status(201).json(newExperience);

    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to create new experience' });
    }
});

// Update Experience
routerExperiences.put('/:id', async (req, res) => {
    try {
        const { ExperienceName, ExperienceDescription } = req.body;

        const updatedExp = await Experience.findByIdAndUpdate(
            req.params.id,
            { ExperienceName, ExperienceDescription },
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

// Delete an Experience (doesn't remove Experience from DayExperiences arrays)
routerExperiences.delete('/:id', async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ 'Error': 'Unable to delete experience'});
    }
});


// Add an Experience to a Day of a Trip
routerTrips.post('/:tripId/:dayId/:expId', async (req, res) => {
    try {
        const { tripId, dayId, expId } = req.params;

        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ 'Error': 'Trip not found' });
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
routerTrips.delete('/:tripId/:dayId/:expId', async (req, res) => {
    try {
        const { tripId, dayId, expId } = req.params;

        const trip = await Trip.findById(tripId);
        if (!trip) {
            return res.status(404).json({ 'Error': 'Trip not found' });
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
routerTrips.put('/:tripId/:dayId1/:dayId2/:expId', async (req, res) => {
    try {
      const { tripId, dayId1, dayId2, expId } = req.params;
  
      const trip = await Trip.findById(tripId);
      if (!trip) {
        return res.status(404).json({ 'Error': 'Trip not found' });
      }
  
      const day1 = trip.TripDays.find(day => day._id.toString() === dayId1);
      const day2 = trip.TripDays.find(day => day._id.toString() === dayId2);
      if (!day1 || !day2) {
        return res.status(404).json({ 'Error': 'One or both days not found' });
      }
  
      const index = day1.DayExperiences.indexOf(expId);
      if (index === -1) {
        return res.status(404).json({ 'Error': 'Experience not found in the specified day' });
      }
  
      const experience = day1.DayExperiences.splice(index, 1)[0];
      day2.DayExperiences.push(experience);
  
      await trip.save();
  
      res.status(200).json(trip);
    } catch (error) {
      console.log(error);
      res.status(500).json({ 'Error': 'Unable to move experience' });
    }
  });
  
export { routerTrips, routerExperiences };
