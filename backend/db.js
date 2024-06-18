/*
Based on information from the following articles
Title: How to Use MongoDB and Mongoose with Node.js
Author: Stanley Ulili
URL: https://blog.appsignal.com/2023/08/09/how-to-use-mongodb-and-mongoose-for-nodejs.html

Title: Connect MongoDB database to Express server — step-by-step
Author: Sharmila S.
URL: https://medium.com/featurepreneur/connect-mongodb-database-to-express-server-step-by-step-53e548bb4967
*/

import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export default function connectDB() {
  const url = process.env.MONGO_URL;
  try {
    mongoose.connect(
        url,
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
