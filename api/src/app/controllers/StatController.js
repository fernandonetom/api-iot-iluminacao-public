const UserConnections = require("../model/usersConnections");
const moment = require("moment-timezone");
moment.tz("America/Sao_Paulo");
class StatController {
  async index(req, res) {
    const daysBefore = moment().subtract(7, "days").format("YYYY-MM-DD");

    const response = await UserConnections.aggregate([
      {
        $project: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          createdAt: 1,
          userId: 1,
          orgId: 1,
        },
      },
      {
        $match: {
          date: { $gte: daysBefore },
          userId: 1,
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ]);

    var responseDays = response.map(function (item) {
      return item._id;
    });

    var start = new Date(moment().subtract(7, "days").format("YYYY/MM/DD"));
    var end = new Date(moment().format("YYYY/MM/DD"));

    for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
      let dataComparada = moment(d).format("YYYY-MM-DD");

      if (!responseDays.includes(dataComparada))
        response.push({ _id: dataComparada, count: 0 });
    }

    const result = response.sort(function (a, b) {
      return a._id < b._id ? -1 : a._id > b._id ? 1 : 0;
    });

    return res.json(result);
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
