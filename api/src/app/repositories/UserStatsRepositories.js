const UserConnections = require("../model/usersConnections");
const { getAsync, set } = require("../../database/redis");
const moment = require("moment-timezone");
moment.locale("pt-br");
class UserStatsRepositories {
  async index() {
    try {
      const data = await UserConnections.find();
      return data;
    } catch (err) {
      return err;
    }
  }
  async sessionsLastDays({ orgId, days }) {
    const key = `UserStatsRepositories.sessionsLastDays({${orgId},${days}})`;

    const daysBefore = moment()
      .subtract(parseInt(parseFloat(days)), "days")
      .format("YYYY-MM-DD");

    let response = [];

    const cache = await getAsync(key);

    if (cache) {
      response = cache;
    } else {
      response = await UserConnections.aggregate([
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
          },
        },
        {
          $match: {
            date: { $gte: daysBefore },
            orgId: orgId,
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
      ]);
      set(key, response, 600);
    }

    var responseDays = response.map(function (item) {
      return item._id;
    });

    var start = new Date(
      moment()
        .subtract(parseInt(parseFloat(days)), "days")
        .format("YYYY/MM/DD")
    );
    var end = new Date(moment().format("YYYY/MM/DD"));

    for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
      let dataComparada = moment(d).format("YYYY-MM-DD");

      if (!responseDays.includes(dataComparada))
        response.push({ _id: dataComparada, count: 0 });
    }

    const result = response.sort(function (a, b) {
      return a._id < b._id ? -1 : a._id > b._id ? 1 : 0;
    });

    response = result.map(function (item) {
      return {
        data: item._id,
        valor: item.count,
      };
    });

    return response;
  }
  async sessionsLastMonths({ orgId, months }) {
    const key = `UserStatsRepositories.sessionsLastMonths({${orgId},${months}})`;

    const monthsBefore = moment()
      .subtract(parseInt(parseFloat(months)), "months")
      .format("YYYY-MM-DD");

    const cache = await getAsync(key);

    if (cache) {
      return cache;
    } else {
      let response = await UserConnections.aggregate([
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
          },
        },
        {
          $match: {
            date: { $gte: monthsBefore },
            orgId: orgId,
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
      ]);

      var monthsArray = response.map(function (item) {
        return item._id;
      });

      var start = new Date(
        moment().subtract(months, "months").format("YYYY-MM-DD")
      );
      var end = new Date(moment().format("YYYY-MM-DD"));

      for (var d = start; d <= end; d.setMonth(d.getMonth() + 1)) {
        let MyDate = moment(d).format("YYYY-MM");
        if (!monthsArray.includes(MyDate))
          response.push({ _id: MyDate, count: 0 });
      }
      let result = response.sort(function (a, b) {
        return a._id < b._id ? -1 : a._id > b._id ? 1 : 0;
      });
      result = result.map(function (item) {
        return {
          mes: moment(item._id).format("MM"),
          mesNome: moment(item._id).format("MMM").toLocaleUpperCase(),
          ano: moment(item._id).format("YYYY"),
          valor: item.count,
        };
      });
      set(key, result, 600);
      return result;
    }
  }
  async storeSession({ userId, orgId }) {
    try {
      const insert = await UserConnections.create({ userId, orgId });
      return insert;
    } catch (err) {
      return err;
    }
  }
}
module.exports = new UserStatsRepositories();
