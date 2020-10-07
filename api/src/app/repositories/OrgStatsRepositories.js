const OrgConnections = require("../model/orgsConnections");
const OrgsConnections = require("../model/orgsConnections");
class OrgsStatsRepository {
  async index({ orgId }) {
    const data = await OrgConnections.findOne({ orgId }).sort({
      createdAt: -1,
    });
    return data;
  }
  async create(data) {
    const insert = await OrgsConnections.create(data);
    return insert;
  }
}
module.exports = new OrgsStatsRepository();
