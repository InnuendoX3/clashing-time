require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const dbConnect = require('./db');
const allRoutes = require('./network/all-routes');
const startSchedule = require('./resources/start-schedule');

const dailyData = require('./resources/daily-data');

const app = express();
const port = process.env.PORT || 5051;

dbConnect(process.env.DB_URL);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', __dirname + '/views/layout');

app.use(expressLayouts);
app.use(express.json()); // Parse JSON bodies / No need body-parser module
app.use(express.urlencoded({ limit: '10mb', extended: false }));

allRoutes(app);

startSchedule();
// dailyData()

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})