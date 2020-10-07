const mongodb = require("../../database/mongodb");

const OrgConnectionsSchema = new mongodb.Schema({
  orgId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  adminUsers: {
    type: Number,
    default: 0,
  },
  users: {
    type: Number,
    default: 0,
  },
  devices: {
    type: Number,
    default: 0,
  },
  storages: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrgConnections = mongodb.model("OrgConnections", OrgConnectionsSchema);

module.exports = OrgConnections;
