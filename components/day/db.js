const DayModel = require('./model');
const { response } = require('express');

async function getAllDays() {
  return await DayModel.find();
}

// Get currentBattleCount from the last day saved
async function getLastBattleCount(userId) {
  const responseFromDb = await DayModel
    .find({"user": userId},{"currentBattleCount": 1})
    .sort({"_id": -1})
    .limit(1);
  return responseFromDb;
}

async function getUserBattles(userId) {
  const responseFromDb = await DayModel
    .find({"user": userId})
    .sort({"date": -1})
  return responseFromDb;
}

async function saveBattleDay(day) {
  const dayToSave = new DayModel(day);
  return await dayToSave.save(dayToSave);
}

module.exports = {
  dbGetAllDays: getAllDays,
  dbGetLastBattleCount: getLastBattleCount,
  dbGetUserBattles: getUserBattles,
  dbSaveBattleDay: saveBattleDay,
};

