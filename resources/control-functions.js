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


function parseBattlesToTime(battles) {
  if ( isNaN(battles) ) return 'Subscription day.' // TODO: Do something better
  const minutesPerBattle = 3;
  const totalMinutes = battles * minutesPerBattle;

  const weeks = totalMinutes /10080;
  const weeksToPrint = Math.trunc(weeks);
  const leftOfWeeks = weeks - weeksToPrint;

  const days = leftOfWeeks * 7;
  const daysToPrint = Math.trunc(days);
  const leftOfDays = (days - daysToPrint);

  const hours = leftOfDays * 24;
  const hoursToPrint = Math.trunc(hours);
  const leftOfHours = (hours - hoursToPrint);

  const minutesToPrint = Math.round((leftOfHours * 60));

  const weeksString = weeksToPrint === 0 ? '' : `${weeksToPrint} weeks`;
  const daysString = daysToPrint === 0 ? '' : `${daysToPrint}d`;
  const hoursString = `${hoursToPrint}h`;
  const minutesString = `${minutesToPrint}m`;

  const stringToPrint = `${weeksString} ${daysString} ${hoursString} ${minutesString}`

  return stringToPrint;
}


module.exports = {
  getUserInfoFromAPI,
  fixTag,
  parseBattlesToTime
}