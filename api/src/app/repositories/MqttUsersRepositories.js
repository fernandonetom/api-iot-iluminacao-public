const db = require('../../database/connection');

class MqttUsersRepository {
  async findMqttByOrgId(orgId) {
    const mqtt = await db('mqtt_user').where('organization_id', orgId);
    return mqtt;
  }

  async findByUsername(username) {
    const mqtt = await db('mqtt_user').where('username', username);
    return mqtt;
  }

  async findById(id) {
    const mqtt = await db('mqtt_user').where('id', id);
    return mqtt;
  }

  async delete(id) {
    const mqtt = await db('mqtt_user').where('id', id).del();
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
    const mqtt = await db('mqtt_user').insert({
      name,
      username,
      password,
      latitude,
      longitude,
      organization_id,
      user_id,
    }).returning('id');
    return mqtt;
  }

  async update({
    name,
    latitude,
    longitude,
    id,
  }) {
    const mqtt = await db('mqtt_user').update({
      name,
      latitude,
      longitude,
    }).where('id', id);
    return mqtt;
  }
}
module.exports = new MqttUsersRepository();
