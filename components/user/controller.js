const { fixTagGetUserInfo } = require('../../resources/control-functions');
const { dbSaveUser } = require('./db');
const { dbSaveBattleDay } = require('../day/db');


async function subscribeNewUser(userTag) {
  const dataReturned = await fixTagGetUserInfo(userTag)
  
  /** Save first time user */
  const toSaveOnUser = {
    tag: dataReturned.tag,
    name: dataReturned.name,
    subscribed: Date.now(),
  }
  const userSaved = await dbSaveUser(toSaveOnUser)
  console.log('userSaved', userSaved);
  
  /** Ser first battleDay */
  const toSaveOnBattleDay = {
    user: userSaved._id,
    yesterdayBattleCount: 0,
    currentDaybattleCount: dataReturned.battleCount,
    date: Date.now(),
  }
  const battleDaySaved = await dbSaveBattleDay(toSaveOnBattleDay)
  console.log('battleDaySaved', battleDaySaved)

  return dataReturned;
}

module.exports = {
  controlSubscribeNewUser: subscribeNewUser,
}