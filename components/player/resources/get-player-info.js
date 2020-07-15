const makeRequestByPlayer = require('./request-to-clash-api');
const playerTag = '8CRRY8J02';

function getPlayerInfo() {

  return new Promise((resolve, reject) => {
    makeRequestByPlayer(playerTag)
    .then( playerData => { 
      let date = new Date().toString();
      let relevantPlayerData = {
        tag:          playerData.tag,
        name:         playerData.name,
        battleCount:  playerData.battleCount,
        takenAt:      date,
      }  
      resolve(relevantPlayerData);
    })
    .catch( error => {
      return reject(error);
    })
  })
}

module.exports = getPlayerInfo;