const DayModel = require('./model');
const { response } = require('express');

async function getAllDays() {
  return await DayModel.find();
/*   return new Promise((resolve, reject) => {
    DayModel.find()
      .then(data => resolve(data))
      .catch( err => reject(err))
  }) */
}

async function getLastBattleCount(userID) {
  const responseFromDb = await DayModel
    .find({"user": userID},{"currentBattleCount": 1})
    .sort({"_id": -1})
    .limit(1);
  return responseFromDb;
}

async function saveBattleDay(day) {
  const dayToSave = new DayModel(day);
  return await dayToSave.save(dayToSave);
  
/*   return new Promise((resolve, reject) => {
  dayToSave.save()
    .then( dataReturned => resolve(dataReturned))
    .catch( err => reject(err))
  }) */
}

module.exports = {
  dbGetAllDays: getAllDays,
  dbGetLastBattleCount: getLastBattleCount,
  dbSaveBattleDay: saveBattleDay,
};

