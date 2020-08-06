const { getUserInfoFromAPI, fixTag } = require('../../resources/control-functions');
const { dbSaveUser, dbGetUsers, dbSearchUser} = require('./db');
const { dbSaveBattleDay } = require('../day/db');

// Search user on DataBase
async function searchUser(nameOrTag, searchBy) {
  console.log(nameOrTag, searchBy);
  let query = {};

  if(searchBy === 'tag') {
    const preTag = '#';
    const tagFixed = preTag.concat(fixTag(nameOrTag));
    query = {
      tag: tagFixed,
    }
  } else {
    query = {
      name: nameOrTag,
    }
  }

  return dbSearchUser(query)
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
  const dataReturned = await getUserInfoFromAPI(userTag)

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
  controlSearchUser: searchUser,
  controlGetUsersTagIDList: getUsersTagIDList,
  controlSubscribeNewUser: subscribeNewUser,
}