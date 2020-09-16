const mongodb = require("../../database/mongodb");

const UserConnectionsSchema = new mongodb.Schema({
  userId: {
    type: Number,
    required: true,
  },
  orgId: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserConnections = mongodb.model("UserConnections", UserConnectionsSchema);

// module.exports = UserConnections;
// db.userconnections.aggregate([
//   { $match: {
//     createdAt: {"$gte": ISODate("2020-09-13T00:00:00.000Z")}
//   }
//   },
//   {
//     $project: {
//         createdAt: {
//             $dateToString: {
//                 format: "%Y-%m-%d",
//                 date: "$createdAt"
//             }
//         }
//     }
//   },
//   {
//     $group: {
//       _id: {
//         createdAt: '$createdAt',
//         hora: '$hora'
//       },
//       count: { $sum: 1 },

//     }
//   },
//   { $addFields: { hora: "$cretedAt" } },
// ]);
