import mongoose from "mongoose";

export default function connectDB() {
  try {
    mongoose.connect(
        process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}
