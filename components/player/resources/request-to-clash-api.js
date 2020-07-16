const https = require('https');
const url = require('url');

const API_activated = true;

const requestUrl = url.parse('https://api.clashroyale.com/v1/players/');
const preTag = '%23'; // Replaces the # of player's tag on URL 
const token = `Bearer ${process.env.AUTHORIZATION_TOKEN}`;

requestUrl.headers = {
  'authorization': token,
}

/** 
 *  Make request to Royal Clash API by playerTag.
 *  Returns big object with ALL player's info sent by Royale Clash API
 */
function makeRequestByPlayer(playerTag) {
  requestUrl.path = requestUrl.path.concat(preTag, playerTag);

  // --  Preventing lot of API requests when testing
  if (API_activated) {

    return new Promise((resolve, reject) => {
      https.get(requestUrl, receiving => {
        console.log(requestUrl)
        let infoComming = '';
        receiving.on('data', chunk => {
          infoComming += chunk;
        })
        receiving.on('end', () => {
          let playerData = JSON.parse(infoComming);
          // Reject if accessDenied. 'Reason' object property when invalid authorization.
          if(playerData.hasOwnProperty('reason')) {
            return reject(playerData);
          }
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



