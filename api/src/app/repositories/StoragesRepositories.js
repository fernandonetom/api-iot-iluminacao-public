const db = require("../../database/connection");

class StoragesRepositories {
  async listAlertAndMovimentoByDateHour(type, date, hour, id) {
    const data = await db(type)
      .whereRaw(
        'mqtt_user_id = ? and "createdAt"::date = ? and date_part(\'hour\', "createdAt") in (?) and valor = 1',
        [id, date, hour]
      )
      .count("*")
      .first();
    return data;
  }

  async listAlertAndMovimentoByDate(type, date, id) {
    const data = await db
      .select(
        db.raw(
          "date_part('hour', \"createdAt\") as hora, COUNT(*)::integer as valor"
        )
      )
      .from(type)
      .whereRaw('mqtt_user_id = ? and "createdAt"::date = ?', [id, date])
      .groupByRaw("date_part('hour', \"createdAt\")");
    return data;
  }

  async listAlertAndMovimentoByPeriod(type, dateStart, dateStop, id) {
    const data = await db
      .select(db.raw('"createdAt"::date, COUNT(*)::integer as valor'))
      .from(type)
      .whereRaw(
        'mqtt_user_id = ? and "createdAt"::date >= ? and "createdAt"::date <= ? and valor = 1',
        [id, dateStart, dateStop]
      )
      .groupByRaw('"createdAt"::date');
    return data;
  }

  async listStorageByDate(type, date, id) {
    const data = await db
      .select(
        db.raw(
          "date_part('hour', \"createdAt\") as hora, AVG(valor)::real as valor"
        )
      )
      .from(type)
      .whereRaw('mqtt_user_id = ? and "createdAt"::date = ?', [id, date])
      .groupByRaw("date_part('hour', \"createdAt\")");
    return data;
  }

  async listStorageByPeriodo(type, dateStart, dateStop, id) {
    const data = await db
      .select(db.raw('"createdAt"::date, AVG (valor)::real as valor'))
      .from(type)
      .whereRaw(
        'mqtt_user_id = ? and "createdAt"::date >= ? and "createdAt"::date <= ?',
        [id, dateStart, dateStop]
      )
      .groupByRaw('"createdAt"::date');
    return data;
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
    const data = await db(`dados_${type}`)
      .where("mqtt_user_id", id)
      .orderBy("createdAt", "desc")
      .first();
    return data;
  }
}
module.exports = new StoragesRepositories();
