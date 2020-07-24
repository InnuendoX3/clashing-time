const {dbGetAllDays, dbSaveBattleDay} = require('./db');

async function getAllDays() {
  const allDaysData = await dbGetAllDays();
  console.log('allDaysData es:')
  console.log(allDaysData)
  return allDaysData;
}

async function setBattleDay(dayInfo) {
  const dayInfoToSave = {
    tag: dayInfo.tag,
    user: dayInfo.user,
    yesterdayBattleCount: dayInfo.yesterdayBattleCount,
    currentDaybattleCount: dayInfo.currentDaybattleCount,
    date: Date.now()
  }

  console.log('Intentando usar Async Await 2');

  return await dbSaveBattleDay(dayInfoToSave);
/*   return new Promise((resolve, reject) => {
    dbSaveBattleDay(dayInfoToSave)
      .then( dataFromDB => {
        resolve(dataFromDB);
      })
      .catch( err => {
        return reject(err);
      })
  }) */
}

module.exports = {
  controlGetAllDays: getAllDays,
  controlSetBattleDay: setBattleDay,
}