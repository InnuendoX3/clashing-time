const { fixTagGetUserInfo } = require('../../resources/control-functions');
const { dbSaveUser, dbGetUsers } = require('./db');
const { dbSaveBattleDay } = require('../day/db');

function getUserByTag(userTag) {
  const usersito = {
    nombre: 'Testeando',
    apellido: 'Rendering',
    tag: userTag,
  }
  return new Promise((resolve, reject) => {
    console.log('usersito', usersito)
    resolve(usersito)
  })
}

async function getUsersTagList() {
  const userList = await dbGetUsers()
  const usersTagList = userList.map( user => user.tag )
  return usersTagList;
}

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
  
  /** Set first currentBattleDay */
  const toSaveOnBattleDay = {
    user: userSaved._id,
    yesterdayBattleCount: 0,
    currentBattleCount: dataReturned.battleCount,
    date: Date.now(),
  }
  const battleDaySaved = await dbSaveBattleDay(toSaveOnBattleDay)
  console.log('battleDaySaved', battleDaySaved)

  return dataReturned;
}

module.exports = {
  controlGetUserByTag: getUserByTag,
  controlGetUsersTagList: getUsersTagList,
  controlSubscribeNewUser: subscribeNewUser,
}