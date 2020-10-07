const statsSchedule = require("./statsSchedule");

const cronsStart = () => {
  statsSchedule.start();
};

module.exports = cronsStart;
