const DayModel = require('./model');

async function getAllDays() {
  return await DayModel.find();
/*   return new Promise((resolve, reject) => {
    DayModel.find()
      .then(data => resolve(data))
      .catch( err => reject(err))
  }) */
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
  dbSaveBattleDay: saveBattleDay,
};

