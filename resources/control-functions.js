const getPlayerInfo = require("./to-clash-api/get-player-info");

// Fix tag and request user info from Clash API
async function getUserInfoFromAPI(tag) {
  const userTag = fixTag(tag);
  const newUserInfo = await getPlayerInfo(userTag);
  return newUserInfo;
}


// Removes the initial #. Set uppercase
function fixTag(tag) {
  const correctedTag = tag.startsWith('#') 
  ? tag.slice(1).toUpperCase()
  : tag.toUpperCase();
  return correctedTag;
}


function parseBattlesToHours(battles) {
  const minutesPerBattle = 3;
  const totalMinutes = battles * minutesPerBattle;
  const hours = totalMinutes / 60
  const hoursString = `${hours} hours`
  return hoursString;
}

module.exports = {
  getUserInfoFromAPI,
  fixTag,
  parseBattlesToHours
}