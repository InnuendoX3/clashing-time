const useClashRoyaleApi = process.env.USE_CLASH_ROYALE_API === 'true' ? true : false;
const useFixieProxy = process.env.USE_FIXIE_PROXY === 'true' ? true : false;

// Requesting local-directly to Clash API needs HTTPS module but Fixie works with module HTTP
const http = useFixieProxy ? require('http') : require('https');
const getRightUrlOptions = require('./options-to-api')


/** 
 *  Make request to Royal Clash API by playerTag.
 *  Returns big object with ALL player's info sent by Royale Clash API
 */
function makeRequestByPlayer(playerTag) {
  // if -->  Preventing lot of API requests when testing db
  if (useClashRoyaleApi) {

    let urlOptions = getRightUrlOptions(useFixieProxy, playerTag);

    return new Promise((resolve, reject) => {
      http.get(urlOptions, receiving => {
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
        tag: '#n0n3',
        name: 'Hardcoded Object',
        battleCount: 'Preventing lots of requests when testing',
      };
      resolve(noRealInfo);
    })

  }

}

module.exports = makeRequestByPlayer;



