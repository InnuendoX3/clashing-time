const { controlGetUsersTagIDList }  = require('../components/user/controller');
const { controlgetLastBattleCount, controlSetBattleDay } = require('../components/day/controller');
const { fixTagGetUserInfo } = require('./control-functions');

async function dailyData() {
  console.log('Daily data function activated.')
  const usersList = await controlGetUsersTagIDList();

  usersList.map( async user => {
    // Get last battles from DataBase
    const lastBattleCount = await controlgetLastBattleCount(user.id);
    
    // Getting current data from API
    const userBattleDay = await fixTagGetUserInfo(user.tag);

    const newBattleDayToSave = {
      user: user.id,
      yesterdayBattleCount: lastBattleCount,
      currentBattleCount: userBattleDay.battleCount,      
    };

    console.log('newBattleDayToSave', newBattleDayToSave)

    // Save a new battleDay
    controlSetBattleDay(newBattleDayToSave)
      .then( data => console.log(data))
      .catch( err => console.error(err))
  })

}

module.exports = dailyData;
