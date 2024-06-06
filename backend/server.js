import connectDB from "./db.js";
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser'; 
import { routerTrips, routerExperiences } from './router.js';
import { authErrorHandler } from './auth.js';

const app = express();

connectDB();

app.enable('trust proxy');
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use('/trips', routerTrips);
app.use('/experiences', routerExperiences);
app.use(authErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)});