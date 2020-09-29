const { getUserInfoFromAPI, fixTag, parseBattlesToTime } = require('../../resources/control-functions');
const { dbSaveUser, dbGetUsers, dbSearchUser, dbGetUserInfo } = require('./db');
const { dbSaveBattleDay, dbGetUserBattles } = require('../day/db');

// Search user on DataBase
async function searchUser(nameOrTag, searchBy) {
  let query = {};

  if (searchBy === 'tag') {
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
    totalTime: parseBattlesToTime(userBattlesFromDb[0].currentBattleCount),
  }
  const userBattlesToSend = userBattlesFromDb.map(battleDay => {
    const dayRelevantInfo = {
      yesterdayBattleCount: battleDay.yesterdayBattleCount,
      currentBattleCount: battleDay.currentBattleCount,
      battlesQty: battleDay.battlesQty,
      time: parseBattlesToTime(battleDay.battlesQty),
      date: battleDay.date.toDateString(),
    }
    return dayRelevantInfo;
  })
  const totalUserInfo = {
    userInfo: userInfoToSend,
    userBattles: userBattlesToSend,
  }
  return totalUserInfo;
}

async function getUsersTagIDList() {
  const userList = await dbGetUsers()
  const usersTagIDList = userList.map(user => {
    return {
      id: user._id,
      tag: user.tag,
      name: user.name
    }
  })
  return usersTagIDList;
}

async function subscribeNewUser(userTag) {

  /* Check on DB if tag is already subscribed */
  const preTag = '#';
  const tagFixed = preTag.concat(fixTag(userTag));
  query = {
    tag: tagFixed,
  }

  if ((await dbSearchUser(query)).length > 0) {
    const errorMessage = `The tag ${tagFixed} is already subscribed`;
    const messageToLog = `[Not subscribed] The tag ${tagFixed} is already subscribed`;
    return {
      errorMessage,
      messageToLog,
    };
  }

  try {
    const dataReturned = await getUserInfoFromAPI(userTag)

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
      messageToLog: message,
      userSubscribed: {
        tag: userSaved.tag,
        name: userSaved.name,
        battleCount: battleDaySaved.currentBattleCount,
        totalTime: parseBattlesToTime(battleDaySaved.currentBattleCount),
      }
    }

    return response;
    
  } catch (err) {
    // Can happen the tag does not exist on Clash API
    const errorMessage = `Cannot subscribe. Tag ${userTag} is not valid or user has not played yet.`;
    const messageToLog = `[Not subscribed] Tag entered ${userTag} is not valid or user has not played yet. Tagfixed: ${tagFixed}`;
    return {
      errorMessage,
      messageToLog,
    };
  }

}

async function getQtyUsers() {
  const usersQty = (await dbGetUsers()).length;
  return usersQty;
}

module.exports = {
  controlSearchUser: searchUser,
  controlGetUserBattles: getUserBattles,
  controlGetUsersTagIDList: getUsersTagIDList,
  controlSubscribeNewUser: subscribeNewUser,
  controlGetQtyUsers: getQtyUsers
}