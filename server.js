require('dotenv').config();

const express = require('express');
const dbConnect = require('./db');
const allRoutes = require('./network/all-routes');
const dailyData = require('./components/day/daily-data');

const app = express();
const port = process.env.PORT || 5051;

dbConnect(process.env.DB_URL);
app.use(express.json()) // Parse JSON bodies / No need body-parser module
allRoutes(app);


/* const playerTag = '800000000';
app.get('/', (req, res) => {
  dailyData(playerTag)
    .then( dataFromClash => {
      //controlDataAndSave(dataFromClash) // TODO
      res.send(dataFromClash);
    })
    .catch( error => {
      console.log(error)
      res.send(error);
    })
  
}) */


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})