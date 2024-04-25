import connectDB from "./db.js";
import express from "express";
import bodyParser from 'body-parser'; 
import routerTrips from "./router.js"

const app = express();
const port = 3000;

connectDB();
app.use(bodyParser.json());
app.use('/trips', routerTrips);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});