const https = require('https');

const url = 'https://api.clashroyale.com/v1/players/';
const preTag = '%23'; // Replaces the # of player's tag on URL 
const token = `Bearer ${process.env.AUTHORIZATION_TOKEN}`;
const options = {
  headers: {
    'authorization': token,
  }
}

const API_activated = true;

/** 
 *  Make request to Royal Clash API by playerTag.
 *  Returns big object with ALL player's info sent by Royale Clash API
 */
function makeRequestByPlayer(playerTag) {
  const wholeurl = url.concat(preTag, playerTag);

  // --  Preventing lot of API requests when testing
  if (API_activated) {

    return new Promise((resolve, reject) => {
      https.get(wholeurl, options, receiving => {
        let infoComming = '';
        receiving.on('data', chunk => {
          infoComming += chunk;
        })
        receiving.on('end', () => {
          let playerData = JSON.parse(infoComming);
          resolve(playerData);
        })
      })
      .on('error', err => {
        return reject(error);
      })
    })

  } else {

    return new Promise((resolve, reject) => {
      let noRealInfo = {
        tag: '#NONE',
        name: 'Hardcoded Object',
        battleCount: 'Preventing lots of requests when testing',
      };
      resolve(noRealInfo);
    })

  }

}

module.exports = makeRequestByPlayer;



