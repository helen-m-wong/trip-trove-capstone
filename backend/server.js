import connectDB from "./db.js";
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser'; 

/*
import path from 'path';
import { fileURLToPath } from 'url';
*/

import { routerTrips, routerExperiences } from './router.js';
import { authErrorHandler } from './auth.js';

/*
// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
*/

const app = express();

connectDB();

app.enable('trust proxy');
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// API routes
app.use('/trips', routerTrips);
app.use('/experiences', routerExperiences);
app.use(authErrorHandler);

/*
// Serve static files from the React app
app.use('/static', express.static(path.join(__dirname, '../frontend/build/static')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});