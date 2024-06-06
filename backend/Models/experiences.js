import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema(
    {
        ExperienceName: {
            type: String,
            required: true
        },
        ExperienceDescription: {
            type: String,
            required: true
        },
        ExperienceImage: {
            type: String
        },
        userId: {
            type: String,
            required: true
        }
    });

const Experience = mongoose.model("Experience", ExperienceSchema)
export default Experience;
