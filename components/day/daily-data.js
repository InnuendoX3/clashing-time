const getPlayerInfo = require('../../resources/to-clash-api/get-player-info');
const { controlGetUsersTagList }  = require('../user/controller');

async function dailyData() {
  console.log('Daily data function activated.')
  const usersList = await controlGetUsersTagList();
  
  console.log(usersList);

  // TODO: Get list of players susbcribed to get daily data.
  
  /* return new Promise((resolve, reject) => {
    getPlayerInfo(playerTag)
      .then( playerInfo => {
        resolve(playerInfo);
      })
      .catch( error => {return reject(error)} )

  }) */
}

module.exports = dailyData;
