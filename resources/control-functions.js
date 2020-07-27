const getPlayerInfo = require("./get-player-info");
//tag = "#8cRRY8J02"

/** 
 * Functions to export 
*/

async function fixTagGetUserInfo(tag) {
  const userTag = fixTag(tag);
  const newUserInfo = await getPlayerInfo(userTag);
  return newUserInfo;
}


/** 
 * Internal functions  
*/

// Removes the initial #. Set uppercase
function fixTag(tag) {
  const correctedTag = tag.startsWith('#') 
  ? tag.slice(1).toUpperCase()
  : tag.toUpperCase();
  return correctedTag;
}

module.exports = {
  fixTagGetUserInfo,
}