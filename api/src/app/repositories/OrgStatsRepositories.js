const OrgConnections = require("../model/orgsConnections");
const OrgsConnections = require("../model/orgsConnections");
class OrgsStatsRepository {
  async index({ orgId }) {
    const data = await OrgConnections.findOne({ orgId }).sort({
      createdAt: -1,
    });
    if (data) {
      return data;
    } else {
      return {
        adminUsers: 0,
        users: 0,
        devices: 0,
        storages: 0,
      };
    }
  }
  async create(data) {
    const insert = await OrgsConnections.create(data);
    return insert;
  }
}
module.exports = new OrgsStatsRepository();
