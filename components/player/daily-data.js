const getPlayerInfo = require('./resources/get-player-info');

function dailyData() {
  console.log('Daily data function activated.')

  // TODO: Get list of players susbcribed to get daily data.

  getPlayerInfo()
  .then( playerInfo => {
    console.log(playerInfo);
  })
  .catch( error => console.log(error) )

}

module.exports = dailyData;
