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
