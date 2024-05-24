import connectDB from "./db.js";
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser'; 
import { routerTrips, routerExperiences } from './router.js';
// import { authErrorHandler } from './auth.js';

const app = express();
const port = 3000;

connectDB();

app.enable('trust proxy');
app.use(cors());
app.use(bodyParser.json());

app.use('/trips', routerTrips);
app.use('/experiences', routerExperiences);

// for auth
// app.use(authErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});