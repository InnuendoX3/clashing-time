const { fixTagGetUserInfo } = require('../../resources/control-functions');
const { dbSaveUser } = require('./db');


async function subscribeNewUser(userTag) {

  const dataReturned = await fixTagGetUserInfo(userTag)
  console.log('dataReturned', dataReturned)
  const toSaveOnUser = {
    tag: dataReturned.tag,
    name: dataReturned.name,
  }
  const userSaved = await dbSaveUser(toSaveOnUser)
  console.log(userSaved);
  //const toSaveOnDayModel = {}
  return dataReturned;
}

module.exports = {
  controlSubscribeNewUser: subscribeNewUser,
}