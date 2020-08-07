const { getUserInfoFromAPI, fixTag, parseBattlesToHours } = require('../../resources/control-functions');
const { dbSaveUser, dbGetUsers, dbSearchUser, dbGetUserInfo} = require('./db');
const { dbSaveBattleDay, dbGetUserBattles } = require('../day/db');

// Search user on DataBase
async function searchUser(nameOrTag, searchBy) {
  let query = {};

  if(searchBy === 'tag') {
    const preTag = '#';
    const tagFixed = preTag.concat(fixTag(nameOrTag));
    query = {
      tag: tagFixed,
    }
  } else {
    query = {
      // Insensitive case for name search
      name: new RegExp(nameOrTag, 'i'),
    }
  }
  return dbSearchUser(query)
}

async function getUserBattles(tagNoHash) {
  const hash = '#'
  const tag = hash.concat(tagNoHash);
  const userInfoFromDb = await dbGetUserInfo(tag);
  const userBattlesFromDb = await dbGetUserBattles(userInfoFromDb._id);
  const userInfoToSend = {
    tag: userInfoFromDb.tag,
    name: userInfoFromDb.name,
    subscribed: userInfoFromDb.subscribed.toDateString(),
    totalBattles: userBattlesFromDb[0].currentBattleCount,
    totalTime: parseBattlesToHours(userBattlesFromDb[0].currentBattleCount),
  }
  const userBattlesToSend = userBattlesFromDb.map( battleDay => {
    const dayRelevantInfo = {
      yesterdayBattleCount: battleDay.yesterdayBattleCount,
      currentBattleCount: battleDay.currentBattleCount,
      battlesQty: battleDay.battlesQty,
      time: parseBattlesToHours(battleDay.battlesQty),
      date: battleDay.date.toDateString(),
    }
    return dayRelevantInfo;
  })
  const totalUserInfo = {
    userInfo: userInfoToSend,
    userBattles: userBattlesToSend,
  }
  //console.log(totalUserInfo)
  return totalUserInfo;
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
  controlGetUserBattles: getUserBattles,
  controlGetUsersTagIDList: getUsersTagIDList,
  controlSubscribeNewUser: subscribeNewUser,
}