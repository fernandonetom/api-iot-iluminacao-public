const CronJob = require("cron").CronJob;

const job = new CronJob("0 */1 * * * *", () => {
  console.log("Teste " + new Date());
});

module.exports = job;
