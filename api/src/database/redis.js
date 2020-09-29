require("dotenv").config();
const redis = require("redis").createClient({
  host: "vps.fernandoneto.com.br",
  port: 6379,
  auth_pass: process.env.DB_PASSWORD,
});
const { promisify } = require("util");
const getAsync = promisify(redis.get).bind(redis);
redis.on("error", function (error) {
  console.error(error);
});
redis.on("connect", async function () {
  console.error("Redis conectado");
});
exports.getAsync = async function (key) {
  const get = await getAsync(key);
  if (get) return JSON.parse(get);
  return get;
};
exports.set = function (key, value, expiration) {
  redis.set(key, JSON.stringify(value));
  redis.expire(key, expiration);
};
exports.redis = redis;
