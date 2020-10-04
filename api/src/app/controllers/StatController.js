const UserConnections = require("../model/usersConnections");
const UserStatsRepositories = require("../repositories/UserStatsRepositories");
const moment = require("moment-timezone");
const ErrorsCatalog = require("../utils/ErrorsCatalog");
moment.tz("America/Sao_Paulo");
class StatController {
  async index(req, res) {
    const days = req.params.days || 7;
    const { orgId } = req.body;

    if (!orgId) return res.json(ErrorsCatalog.organization.idNotFound);

    const data = await UserStatsRepositories.sessionsLastDays({ orgId, days });

    return res.json(data);
  }
  async byMonth(req, res) {
    const months = req.params.months || 7;
    const { orgId } = req.body;

    if (!orgId) return res.json(ErrorsCatalog.organization.idNotFound);

    const data = await UserStatsRepositories.sessionsLastMonths({
      orgId,
      months,
    });

    return res.json(data);
  }
  async create(req, res) {
    // const stats = await UserConnections.create({
    //   userId: 1,
    //   orgId: 3,
    // });
    const date = "2020-09-16";

    const response = await UserConnections.aggregate([
      {
        $project: {
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "America/Sao_Paulo",
            },
          },
          createdAt: 1,
          userId: 1,
          orgId: 1,
          h: { $hour: { date: "$createdAt", timezone: "America/Sao_Paulo" } },
        },
      },
      {
        $match: {
          date: { $eq: date },
          userId: 1,
        },
      },
      {
        $group: {
          _id: "$h",
          count: { $sum: 1 },
        },
      },
    ]);

    const responseHours = response.map(function (item) {
      return item._id;
    });

    const start = 0;
    const end = 23;

    for (var i = start; i <= end; i = i + 1) {
      if (!responseHours.includes(i)) response.push({ _id: i, count: 0 });
    }

    const result = response.sort(function (a, b) {
      return a._id < b._id ? -1 : a._id > b._id ? 1 : 0;
    });

    const resultEnd = result.map((item) => {
      return { ...item, _id: `${item._id}:00` };
    });

    return res.json(resultEnd);
  }
  async teste(req, res) {
    const insert = await UserConnections.create({ userId: 1, orgId: 3 });
    res.json(insert);
  }
  async listar(req, res) {
    const insert = await UserConnections.aggregate([
      {
        $project: {
          userId: 1,
          orgId: 1,
          createdAt: {
            $dateToString: {
              format: "%Y-%m-%dT%H:%M:%S.%LZ",
              date: "$createdAt",
              timezone: "America/Sao_Paulo",
            },
          },
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 2 },
    ]);
    const response = insert.map((item) => {
      return {
        ...item,
        createdAt: moment(item.createdAt).format("YYYY-MM-DD HH:mm"),
      };
    });
    res.json(response);
  }
}
module.exports = new StatController();
