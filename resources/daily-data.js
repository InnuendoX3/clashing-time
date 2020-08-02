const { controlGetUsersTagIDList }  = require('../components/user/controller');
const { controlgetLastBattleCount, controlSetBattleDay } = require('../components/day/controller');
const { fixTagGetUserInfo } = require('./control-functions');

async function dailyData() {
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

    // Save a new battleDay
    controlSetBattleDay(newBattleDayToSave)
      .then( data => console.log(`[Saved] ${user.tag} - ${user.name} : ${data.battlesQty} battles. - ${data.date}`))
      .catch( err => console.error(err))
  })

}

module.exports = dailyData;
