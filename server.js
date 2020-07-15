require('dotenv').config();

const express = require('express');
const dailyData = require('./components/player/daily-data');

const app = express();
const port = process.env.PORT || 5051;

app.get('/', (req, res) => {
  res.send('Hey! I am sending!');
})

dailyData();

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})