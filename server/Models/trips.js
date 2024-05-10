import mongoose from 'mongoose';

const DaySchema = new mongoose.Schema(
    {
        DayNumber: {
            type: Number,
            required: true
        },
        DayExperiences: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Experiences"
        }]
    });

const TripSchema = new mongoose.Schema(
    {
        TripName: {
            type: String,
            maxLength: 100,
            required: true
        },
        TripDays: [DaySchema]
    });

const Trip = mongoose.model("Trip", TripSchema)
export default Trip;