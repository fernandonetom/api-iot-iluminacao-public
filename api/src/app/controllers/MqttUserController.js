const { v1: uuidV1, v4: uuidV4 } = require("uuid");
const OrganizationsRepositories = require("../repositories/OrganizationsRepositories");
const MqttUsersRepositories = require("../repositories/MqttUsersRepositories");
const ErrorsCatalog = require("../utils/ErrorsCatalog");
const MessageCatalog = require("../utils/MessageCatalog");
const StoragesRepositories = require("../repositories/StoragesRepositories");
class MqttUserController {
  async index(req, res) {
    // PRECISA AUTENTICAR USUARIO SIMPLES
    const { orgId } = req.body;
    if (!orgId)
      return res.json({
        error: "Organization not found",
        message: "Organização não informada",
      });

    const organization = await OrganizationsRepositories.findById(orgId);
    if (organization.length === 0)
      return res.json({
        error: "Inválid organization",
        message: "Organização não existe",
      });

    const mqttUsers = await MqttUsersRepositories.findMqttByOrgId(orgId);

    res.json(
      mqttUsers.map((user) => ({
        ...user,
        latitude: parseFloat(user.latitude),
        longitude: parseFloat(user.longitude),
      }))
    );
  }
  async homedashboard(req, res) {
    const { orgId } = req.body;
    if (!orgId)
      return res.json({
        error: "Organization not found",
        message: "Organização não informada",
      });

    const organization = await OrganizationsRepositories.findById(orgId);
    if (organization.length === 0)
      return res.json({
        error: "Inválid organization",
        message: "Organização não existe",
      });

    const mqttUsers = await MqttUsersRepositories.findMqttByOrgId(orgId);

    res.json(
      mqttUsers.map((user) => ({
        id: user.id,
        name: user.name,
        latitude: parseFloat(user.latitude),
        longitude: parseFloat(user.longitude),
      }))
    );
  }
  async store(req, res) {
    // PRECISA AUTENTICAR USUARIO ADMIN, SE CHEGOU AQUI TEMOS QUE É ADMIN
    const { name, latitude, longitude, userId, orgId } = req.body;

    if (!name || !userId || !orgId) return res.json(ErrorsCatalog.nullData);

    const username = uuidV1().slice(0, 6);
    const password = uuidV4().slice(-6);

    const mqttData = {
      name,
      username,
      password,
      latitude: parseFloat(latitude) || null,
      longitude: parseFloat(longitude) || null,
      user_id: userId,
      organization_id: orgId,
    };
    try {
      const mqtt = await MqttUsersRepositories.create(mqttData);
      res.json({
        mqttUserId: mqtt[0],
        ...mqttData,
        latitude: parseFloat(mqttData.latitude),
        longitude: parseFloat(mqttData.longitude),
      });
    } catch (error) {
      console.log(error);
      res.json({ error: error.message, message: "Tente novamente mais tarde" });
    }
  }

  async update(req, res) {
    const { name, latitude, longitude, userId, orgId } = req.body;
    const { id } = req.params;
    if (!name || !userId || !orgId || !id)
      return res.json(ErrorsCatalog.nullData);

    try {
      const findMqttUser = await MqttUsersRepositories.findById(id);
      if (findMqttUser.length === 0)
        return res.json(ErrorsCatalog.mqttUsers.notFound);
      if (findMqttUser[0].user_id !== parseFloat(userId))
        return res.status(401).json(ErrorsCatalog.unAuthorized.notPermissions);
      if (findMqttUser[0].organization_id !== parseFloat(orgId))
        return res.status(401).json(ErrorsCatalog.unAuthorized.notPermissions);

      let newLatitude = parseFloat(latitude) || findMqttUser[0].latitude;
      let newLongitude = parseFloat(longitude) || findMqttUser[0].longitude;

      newLatitude = newLatitude === "null" ? null : newLatitude;
      newLongitude = newLongitude === "null" ? null : newLongitude;

      await MqttUsersRepositories.update({
        name,
        latitude: newLatitude,
        longitude: newLongitude,
        id,
      });

      return res.json(MessageCatalog.updated);
    } catch (error) {
      return res.json(ErrorsCatalog.server(error));
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const { orgId } = req.body;

    const mqtt = await MqttUsersRepositories.findById(id);

    if (mqtt.length === 0)
      return res.json({
        error: "unauthorized",
        message: "Usuário não encontrado",
      });
    if (orgId !== mqtt[0].organization_id)
      return res.json({
        error: "unauthorized",
        message: "Você não tem permissão para executar essa ação",
      });

    try {
      const deleteMqtt = await MqttUsersRepositories.delete(id);
      res.json(deleteMqtt);
    } catch (error) {
      res.json({ error: error.message, message: "Tente novamente mais tarde" });
    }
  }

  async details(req, res) {
    const { id } = req.params;
    const { orgId } = req.body;
    const mqtt = await MqttUsersRepositories.findById(id);

    if (mqtt.length === 0)
      return res.json({
        error: "unauthorized",
        message: "Usuário não encontrado",
      });
    if (orgId !== mqtt[0].organization_id)
      return res.json({
        error: "unauthorized",
        message: "Você não tem permissão para executar essa ação",
      });

    const alerta = await StoragesRepositories.lastDataRegister("alerta", id);
    const temperatura = await StoragesRepositories.lastDataRegister(
      "temperatura",
      id
    );
    const luminosidade = await StoragesRepositories.lastDataRegister(
      "luminosidade",
      id
    );
    const umidade = await StoragesRepositories.lastDataRegister("umidade", id);
    const tensao = await StoragesRepositories.lastDataRegister("tensao", id);
    const movimentacao = await StoragesRepositories.lastDataRegister(
      "movimentacao",
      id
    );
    const rele = await StoragesRepositories.lastDataRegister("rele", id);
    const nullData = {
      valor: null,
    };
    res.json({
      mqtt: {
        id: mqtt[0].id,
        name: mqtt[0].name,
        latitude: mqtt[0].latitude,
        longitude: mqtt[0].longitude,
        createdAt: mqtt[0].createdAt,
      },
      alerta: alerta || nullData,
      temperatura: temperatura || nullData,
      luminosidade: luminosidade || nullData,
      umidade: umidade || nullData,
      tensao: tensao || nullData,
      movimentacao: movimentacao || nullData,
      rele: rele || nullData,
    });
  }
  async credentials(req, res) {
    const { id } = req.params;
    const { orgId } = req.body;
    const mqtt = await MqttUsersRepositories.findById(id);

    if (mqtt.length === 0)
      return res.json({
        error: "unauthorized",
        message: "Usuário não encontrado",
      });
    if (orgId !== mqtt[0].organization_id)
      return res.status(401).json({
        error: "unauthorized",
        message: "Você não tem permissão para executar essa ação",
      });

    res.json(mqtt[0]);
  }
}
module.exports = new MqttUserController();
