const { v1: uuidV1, v4: uuidV4 } = require('uuid');
const OrganizationsRepositories = require('../repositories/OrganizationsRepositories');
const MqttUsersRepositories = require('../repositories/MqttUsersRepositories');

class MqttUserController {
  async index(req, res) {
    // PRECISA AUTENTICAR USUARIO SIMPLES
    const { orgId } = req.body;
    if (!orgId) return res.json({ error: 'Organization not found', message: 'Organização não informada' });

    const organization = await OrganizationsRepositories.findById(orgId);
    if (organization.length === 0) return res.json({ error: 'Inválid organization', message: 'Organização não existe' });

    const mqttUsers = await MqttUsersRepositories.findMqttByOrgId(orgId);

    res.json(mqttUsers);
  }

  async store(req, res) {
    // PRECISA AUTENTICAR USUARIO ADMIN, SE CHEGOU AQUI TEMOS QUE É ADMIN
    const {
      name, latitude, longitude, userId, orgId,
    } = req.body;

    if (!name || !userId || !orgId) return res.json({ error: 'Invalid arguments', message: 'Campos em branco' });

    const username = uuidV1().slice(0, 6);
    const password = uuidV4().slice(-6);

    const mqttData = {
      name,
      username,
      password,
      latitude,
      longitude,
      user_id: userId,
      organization_id: orgId,
    };
    try {
      const mqtt = await MqttUsersRepositories.create(mqttData);
      res.json({ mqttUserId: mqtt[0], ...mqttData });
    } catch (error) {
      console.log(error);
      res.json({ error: error.message, message: 'Tente novamente mais tarde' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const { orgId } = req.body;

    const mqtt = await MqttUsersRepositories.findById(id);

    if (mqtt.length === 0) return res.json({ error: 'unauthorized', message: 'Usuário não encontrado' });
    if (orgId !== mqtt[0].organization_id) return res.json({ error: 'unauthorized', message: 'Você não tem permissão para executar essa ação' });

    try {
      const deleteMqtt = await MqttUsersRepositories.delete(id);
      res.json(deleteMqtt);
    } catch (error) {
      res.json({ error: error.message, message: 'Tente novamente mais tarde' });
    }
  }
}
module.exports = new MqttUserController();
