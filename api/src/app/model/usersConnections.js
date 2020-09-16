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

module.exports = UserConnections;
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

// db.userconnections.aggregate([
//   {$addFields: { "creationDate":  {$dateToString:{format: "%Y-%m-%d", date: "$createdAt"}}}},
//   { $match: {
//     creationDate: {$eq: "2020-09-02"}
//     }
//   },
//   {
//     $project: {
//         createdAt: {
//             $dateToString: {
//                 format: "%Y-%m-%d",
//                 date: "$createdAt"
//             }
//         },
//         hour: { $hour: "$createdAt" },
//     }
//   },
//   {
//     $group: {
//       _id: {
//         hour: '$hour'
//       },
//       count: { $sum: 1 },

//     }
//   }
// ]);
