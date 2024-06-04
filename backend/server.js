import connectDB from "./db.js";
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser'; 
import path from 'path';
import { fileURLToPath } from 'url';
import { routerTrips, routerExperiences } from './router.js';
import { authErrorHandler } from './auth.js';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

connectDB();

app.enable('trust proxy');
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// API routes
app.use('/trips', routerTrips);
app.use('/experiences', routerExperiences);
app.use(authErrorHandler);

// Catch-all handler to serve React's index.html for any other routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
