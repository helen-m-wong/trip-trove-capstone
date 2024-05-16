import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema(
    {
        ExpName: {
            type: String,
            required: true
        },
        ExpDescription: {
            type: String
        }
    });

const Experience = mongoose.model("Experience", ExperienceSchema)
export default Experience;