import connectDB from "./db.js";
import express from "express";

const app = express();
const port = 8010;

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://flip2.engr.oregonstate.edu:${port}`);
});