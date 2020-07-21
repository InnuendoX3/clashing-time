const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;

function dbConnect() {
  const status = mongoose.connection;

  mongoose.connect(dbUrl, {
    useNewUrlParser: true,    // Something deprecated
    useUnifiedTopology: true, // Something deprecated
  })

  status.on('connected', () => {
    console.log('Connected to DB');
  })
  status.on('disconnected', () => {
    console.log('Disconnected from DB');
  })
  status.on('error', err => {
    console.log(err);
  })  
}

module.exports = dbConnect;
