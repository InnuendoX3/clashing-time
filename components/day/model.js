const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  yesterdayBattleCount: Number,
  currentBattleCount: Number,
  date: Date,
});

const DayModel = mongoose.model('Day', daySchema);
module.exports = DayModel;