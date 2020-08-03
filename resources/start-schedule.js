const schedule = require('node-schedule');

const dailyData = require('./daily-data');
const scheduleFormat = process.env.DAILY_REPORT_SCHEDULE;

function startSchedule() {
  console.log('dailyData() will be executed at: ', scheduleFormat);
  schedule.scheduleJob(scheduleFormat, () => {
    dailyData();
  })
}

module.exports = startSchedule;


/*   scheduleFormat

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