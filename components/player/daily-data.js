const getPlayerInfo = require('./resources/get-player-info');



function dailyData() {

  console.log('Daily data function activated.')

  // TODO: Get list of players susbcribed to get daily data.

  tempCounter = 0;
  let runningInterval = setInterval(() => {
    tempCounter++;
    if (tempCounter === 5) {
      clearInterval(runningInterval);
      console.log('Interval cleared');
    }
    // Working good
    getPlayerInfo()
      .then( playerInfo => {
        console.log(playerInfo);
      })
      .catch( error => console.log(error) )
    
  }, 300000); // 30 minutos 1800000 - 5 minutos 300000

}

module.exports = dailyData;
