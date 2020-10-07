const db = require("../../database/connection");
const { set, getAsync } = require("../../database/redis");
const MqttUsersRepositories = require("./MqttUsersRepositories");
class StoragesRepositories {
  async listAlertAndMovimentoByDateHour(type, date, hour, id) {
    const key = `StoragesRepositories.listAlertAndMovimentoByDateHour(${type},${date},${hour},${id})`;
    const cache = await getAsync(key);
    if (cache) {
      return cache;
    } else {
      const data = await db(type)
        .whereRaw(
          'mqtt_user_id = ? and "createdAt"::date = ? and date_part(\'hour\', "createdAt") in (?) and valor = 1',
          [id, date, hour]
        )
        .count("*")
        .first();
      set(key, data || null, 60);
      return data;
    }
  }

  async listAlertAndMovimentoByDate(type, date, id) {
    const key = `StoragesRepositories.listAlertAndMovimentoByDate(${type},${date},${id})`;
    const cache = await getAsync(key);
    if (cache) {
      return cache;
    } else {
      const data = await db
        .select(
          db.raw(
            "date_part('hour', \"createdAt\") as hora, COUNT(*)::integer as valor"
          )
        )
        .from(type)
        .whereRaw('mqtt_user_id = ? and "createdAt"::date = ?', [id, date])
        .groupByRaw("date_part('hour', \"createdAt\")");
      set(key, data, 60);
      return data;
    }
  }

  async listAlertAndMovimentoByPeriod(type, dateStart, dateStop, id) {
    const key = `StoragesRepositories.listAlertAndMovimentoByPeriod(${type},${dateStart},${dateStop},${id})`;
    const cache = await getAsync(key);
    if (cache) {
      return cache;
    } else {
      const data = await db
        .select(db.raw('"createdAt"::date, COUNT(*)::integer as valor'))
        .from(type)
        .whereRaw(
          'mqtt_user_id = ? and "createdAt"::date >= ? and "createdAt"::date <= ? and valor = 1',
          [id, dateStart, dateStop]
        )
        .groupByRaw('"createdAt"::date');
      set(key, data, 60);
      return data;
    }
  }

  async listStorageByDate(type, date, id) {
    const key = `StoragesRepositories.listStorageByDate(${type},${date},${id})`;
    const cache = await getAsync(key);
    if (cache) {
      return cache;
    } else {
      const data = await db
        .select(
          db.raw(
            "date_part('hour', \"createdAt\") as hora, AVG(valor)::real as valor"
          )
        )
        .from(type)
        .whereRaw('mqtt_user_id = ? and "createdAt"::date = ?', [id, date])
        .groupByRaw("date_part('hour', \"createdAt\")");
      set(key, data, 60);
      return data;
    }
  }

  async listStorageByPeriodo(type, dateStart, dateStop, id) {
    const key = `StoragesRepositories.listStorageByPeriodo(${type},${dateStart},${dateStop},${id})`;
    const cache = await getAsync(key);
    if (cache) {
      return cache;
    } else {
      const data = await db
        .select(db.raw('"createdAt"::date, AVG (valor)::real as valor'))
        .from(type)
        .whereRaw(
          'mqtt_user_id = ? and "createdAt"::date >= ? and "createdAt"::date <= ?',
          [id, dateStart, dateStop]
        )
        .groupByRaw('"createdAt"::date');
      set(key, data, 60);
      return data;
    }
  }

  async create({ dado, id, valor }) {
    const data = await db(dado)
      .insert({
        mqtt_user_id: id,
        valor,
      })
      .returning("id");
    return data;
  }

  async lastDataRegister(type, id) {
    const key = `StoragesRepositories.lastDataRegister(${type},${id})`;
    const cache = await getAsync(key);
    if (cache) {
      return cache;
    } else {
      const data = await db(`dados_${type}`)
        .where("mqtt_user_id", id)
        .orderBy("createdAt", "desc")
        .first();
      set(key, data || null, 60);
      return data;
    }
  }

  async countByOrgId({ orgId }) {
    const devices = await MqttUsersRepositories.findMqttByOrgId(orgId);

    const ids = devices.map((device) => device.id);

    let count = 0;

    const temperatura = await db("dados_temperatura")
      .whereIn("mqtt_user_id", [...ids])
      .count();
    count += parseFloat(temperatura[0].count);

    const alerta = await db("dados_alerta")
      .whereIn("mqtt_user_id", [...ids])
      .count();
    count += parseFloat(alerta[0].count);

    const movimentacao = await db("dados_movimentacao")
      .whereIn("mqtt_user_id", [...ids])
      .count();
    count += parseFloat(movimentacao[0].count);

    const luminosidade = await db("dados_luminosidade")
      .whereIn("mqtt_user_id", [...ids])
      .count();
    count += parseFloat(luminosidade[0].count);

    const umidade = await db("dados_umidade")
      .whereIn("mqtt_user_id", [...ids])
      .count();
    count += parseFloat(umidade[0].count);

    const tensao = await db("dados_tensao")
      .whereIn("mqtt_user_id", [...ids])
      .count();
    count += parseFloat(tensao[0].count);

    const rele = await db("dados_rele")
      .whereIn("mqtt_user_id", [...ids])
      .count();
    count += parseFloat(rele[0].count);

    return count;
  }
}
module.exports = new StoragesRepositories();
