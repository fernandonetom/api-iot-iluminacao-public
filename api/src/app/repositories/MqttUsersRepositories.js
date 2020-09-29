const db = require("../../database/connection");
const { set, getAsync } = require("../../database/redis");
class MqttUsersRepository {
  async findMqttByOrgId(orgId) {
    const key = `MqttUsersRepository.findMqttByOrgId(${orgId})`;
    const cache = await getAsync(key);
    if (cache) {
      return cache;
    } else {
      const mqtt = await db("mqtt_user").where("organization_id", orgId);
      set(key, mqtt, 60);
      return mqtt;
    }
  }

  async findByUsername(username) {
    const key = `MqttUsersRepository.findByUsername(${username})`;
    const cache = await getAsync(key);
    if (cache) {
      return cache;
    } else {
      const mqtt = await db("mqtt_user").where("username", username);
      set(key, mqtt, 60);
      return mqtt;
    }
  }

  async findById(id) {
    const key = `MqttUsersRepository.findById(${id})`;
    const cache = await getAsync(key);
    if (cache) {
      return cache;
    } else {
      const mqtt = await db("mqtt_user").where("id", id);
      set(key, mqtt, 60);
      return mqtt;
    }
  }

  async delete(id) {
    const mqtt = await db("mqtt_user").where("id", id).del();
    return mqtt;
  }

  async create({
    name,
    username,
    password,
    latitude,
    longitude,
    organization_id,
    user_id,
  }) {
    const mqtt = await db("mqtt_user")
      .insert({
        name,
        username,
        password,
        latitude,
        longitude,
        organization_id,
        user_id,
      })
      .returning("id");
    return mqtt;
  }

  async update({ name, latitude, longitude, id }) {
    const mqtt = await db("mqtt_user")
      .update({
        name,
        latitude,
        longitude,
      })
      .where("id", id);
    return mqtt;
  }
}
module.exports = new MqttUsersRepository();
