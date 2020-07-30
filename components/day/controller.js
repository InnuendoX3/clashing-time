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
    currentBattleCount: dayInfo.currentBattleCount,
    date: Date.now()
  }

  return await dbSaveBattleDay(dayInfoToSave);
}

module.exports = {
  controlGetAllDays: getAllDays,
  controlSetBattleDay: setBattleDay,
}