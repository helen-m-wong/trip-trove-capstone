import connectDB from "./db.js";
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser'; 
import routerTrips from "./router.js"

const app = express();
const port = 3000;

connectDB();

app.enable('trust proxy');
app.use(cors());
app.use(bodyParser.json());
app.use('/trips', routerTrips);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});