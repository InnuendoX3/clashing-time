const {dbGetAllDays, dbGetLastBattleCount, dbSaveBattleDay} = require('./db');


async function getAllDays() {
  const allDaysData = await dbGetAllDays();
  return allDaysData;
}

async function getLastBattleCount(userID) {
  // Recieve an array from DB and returns just the battleCount number.
  const responseFromDb = await dbGetLastBattleCount(userID)
  const lastBattleCount = responseFromDb[0].currentBattleCount;
  return lastBattleCount;
}

async function setBattleDay(dayInfo) {

  const toSaveOnBattleDay = {
    user: dayInfo.user,
    yesterdayBattleCount: dayInfo.yesterdayBattleCount,
    currentBattleCount: dayInfo.currentBattleCount,
    battlesQty: dayInfo.currentBattleCount - dayInfo.yesterdayBattleCount,
    date: Date(Date.now()),
  }

  return await dbSaveBattleDay(toSaveOnBattleDay);
}

module.exports = {
  controlGetAllDays: getAllDays,
  controlgetLastBattleCount: getLastBattleCount,
  controlSetBattleDay: setBattleDay,
}