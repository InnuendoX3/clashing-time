const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
  tag: String,
  user: String,
  yesterdayBattleCount: Number,
  currentDaybattleCount: Number,
  date: Date,
});

const DayModel = mongoose.model('Day', daySchema);
module.exports = DayModel;