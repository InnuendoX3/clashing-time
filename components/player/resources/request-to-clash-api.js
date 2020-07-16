const https = require('https');
const url = require('url');
const getRightUrlOptions = require('./options-to-api')

const apiActivated = true;
const usingProxy = true;


/** 
 *  Make request to Royal Clash API by playerTag.
 *  Returns big object with ALL player's info sent by Royale Clash API
 */
function makeRequestByPlayer(playerTag) {
  
  // if -->  Preventing lot of API requests when testing
  if (apiActivated) {

    let urlOptions = getRightUrlOptions(usingProxy, playerTag);
    console.log(urlOptions)

    return new Promise((resolve, reject) => {
      https.get(urlOptions, receiving => {
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
        console.error(err)
        return reject(err);
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



