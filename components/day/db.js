const DayModel = require('./model');

function getAllDays() {
  return new Promise((resolve, reject) => {
    DayModel.find()
      .then(data => {
        resolve(data);
      })
      .catch( err => {
        return reject(err);
      })  
  })
}

module.exports = getAllDays;




/* 
const dayBattles = new DayModel({
  tag: '#asdf',
  user: 'Fannita',
  yesterdayBattleCount: 150,
  currentDaybattleCount: 153,
  date: Date.now(),
})

dayBattles.save();
 */