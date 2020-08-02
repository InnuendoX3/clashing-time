const schedule = require('node-schedule');

const dailyData = require('./daily-data');

function startSchedule() {
  console.log('dailyData() will be executed at 23:59:50');
  schedule.scheduleJob('50 59 23 * * *', () => {
    dailyData();
  })
}

module.exports = startSchedule;


/*    scheduleJob first parameter format

*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)

*/

//    */5 works for every five timelapse.