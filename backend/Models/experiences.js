import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema(
    {
        ExperienceName: {
            type: String,
            required: true
        },
        ExperienceDescription: {
            type: String
        }
    });

const Experience = mongoose.model("Experience", ExperienceSchema)
export default Experience;
