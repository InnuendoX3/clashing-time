const express = require('express');
const dailyData = require('./components/player/daily-data');

const app = express();
const PORT = process.env.PORT || 5050;


app.get('/', (req, res) => {
  res.send('Hey! I am sending!');
})

dailyData();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})