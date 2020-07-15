const getPlayerInfo = require('./resources/get-player-info');

function dailyData() {
  console.log('Daily data function activated.')

  // TODO: Get list of players susbcribed to get daily data.
  
  return new Promise((resolve, reject) => {
    getPlayerInfo()
      .then( playerInfo => {
        resolve(playerInfo);
      })
      .catch( error => {return reject(error)} )

  })


}

module.exports = dailyData;
