import dotenv from 'dotenv';
dotenv.config();

import connectDB from "./db.js";
import express from "express";

const app = express();
const port = 3000;

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});