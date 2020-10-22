const CronJob = require("cron").CronJob;
const MqttUsersRepositories = require("../repositories/MqttUsersRepositories");
const OrganizationsRepositories = require("../repositories/OrganizationsRepositories");
const StoragesRepositories = require("../repositories/StoragesRepositories");
const UsersRepositories = require("../repositories/UsersRepositories");
const moment = require("moment-timezone");
const OrgStatsRepositories = require("../repositories/OrgStatsRepositories");

moment.tz.setDefault('America/Recife');

const job = new CronJob("0 */10 * * * *", async () => {
  console.log(`statsSchedule :: ${moment().format("DD/MM/YY HH:mm")}`);
  const orgs = await OrganizationsRepositories.index();
  Promise.all(
    orgs.map(async (organization) => {
      const adminUsers = await UsersRepositories.countAdminUsersByOrg({
        orgId: organization.id,
      });

      const users = await UsersRepositories.countUsersByOrg({
        orgId: organization.id,
      });

      const devices = await MqttUsersRepositories.countByOrgId({
        orgId: organization.id,
      });

      const storages = await StoragesRepositories.countByOrgId({
        orgId: organization.id,
      });

      const data = {
        orgId: organization.id,
        name: organization.name,
        adminUsers: parseFloat(adminUsers[0].count),
        users: parseFloat(users[0].count),
        devices: parseFloat(devices[0].count),
        storages,
      };
      await OrgStatsRepositories.create(data);
    })
  );
});

module.exports = job;
