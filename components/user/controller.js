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
    resolve(usersito)
  })
}

async function getUsersTagIDList() {
  const userList = await dbGetUsers()
  const usersTagIDList = userList.map( user => {
    return {
      id: user._id,
      tag: user.tag,
      name: user.name
    }
  })
  return usersTagIDList;
}

async function subscribeNewUser(userTag) {
  const dataReturned = await fixTagGetUserInfo(userTag)

  // TODO: Check if user has been already subscribed
  
  /** Save first time user */
  const toSaveOnUser = {
    tag: dataReturned.tag,
    name: dataReturned.name,
    subscribed: Date(Date.now()),
  }
  const userSaved = await dbSaveUser(toSaveOnUser)
  
  /** Set first currentBattleDay */
  const toSaveOnBattleDay = {
    user: userSaved._id,
    yesterdayBattleCount: 0,
    currentBattleCount: dataReturned.battleCount,
    date: Date(Date.now()),
  }
  const battleDaySaved = await dbSaveBattleDay(toSaveOnBattleDay)
  
  // Response
  const message = `[Subscribed] ${userSaved.tag} - ${userSaved.name} : ${battleDaySaved.currentBattleCount} battles.`;
  const response = {
    dataReturned,
    message,
  }

  return response;
}

module.exports = {
  controlGetUserByTag: getUserByTag,
  controlGetUsersTagIDList: getUsersTagIDList,
  controlSubscribeNewUser: subscribeNewUser,
}