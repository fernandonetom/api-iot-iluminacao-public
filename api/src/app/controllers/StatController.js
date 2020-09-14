const UserConnections = require("../model/usersConnections");

class StatController {
  async index(req, res) {
    const stats = await UserConnections.find();

    res.json(stats);
  }
  async create(req, res) {
    const stats = await UserConnections.create({
      userId: 1,
      orgId: 3,
    });

    res.json(stats);
  }
}
module.exports = new StatController();
