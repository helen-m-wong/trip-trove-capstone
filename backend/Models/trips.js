import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema(
    {
        TripName: {
            type: String,
            maxLength: 100,
            required: true
        },
        TripStartDate: {
            type: Date,
            required: true
        },
        TripEndDate: {
            type: Date,
            required: true
        },
        TripFlights: [{
            airline: String,
            flightNum: String,
            departureTime: String,
            arrivalTime: String
        }],
        TripCars: [{
            rentalCompany: String,
            pickupDate: Date,
            dropoffDate: Date,
            notes: String
        }],
        TripAccommodations: [{
            accommodationType: String,
            accommodationAddress: String,
            checkInDate: Date,
            checkOutDate: Date,
            notes: String
        }],
        TripExperiences: [{
            type: mongoose.Schema.Types.ObjectId, ref: "Experiences"
        }]
    });

const Trip = mongoose.model("Trip", TripSchema)
export default Trip;