const db = require('../../database/connection');

class StoragesRepositories {
  async listAlertAndMovimentoByDateHour(type, date, hour, id) {
    const data = await db(type).whereRaw('id = ? and "createdAt"::date = ? and date_part(\'hour\', "createdAt") in (?)', [id, date, hour]).count('*').first();
    return data;
  }

  async listAlertAndMovimentoByPeriod(type, dateStart, dateStop, id) {
    const data = await db.select(db.raw('"createdAt"::date, SUM (valor) as count')).from(type)
      .whereRaw('id = ? and "createdAt"::date >= ? and "createdAt"::date <= ?', [id, dateStart, dateStop])
      .groupByRaw('"createdAt"::date');
    return data;
  }

  async listStorageByDate(type, date, id) {
    const data = await db(type).whereRaw('id = ? and "createdAt"::date = ?', [id, date]);
    return data;
  }

  async listStorageByPeriodo(type, dateStart, dateStop, id) {
    const data = await db.select(db.raw('"createdAt"::date, AVG (valor) as count')).from(type)
      .whereRaw('id = ? and "createdAt"::date >= ? and "createdAt"::date <= ?', [id, dateStart, dateStop])
      .groupByRaw('"createdAt"::date');
    return data;
  }

  async create({
    dado, id, valor,
  }) {
    const data = await db(dado).insert({
      mqtt_user_id: id,
      valor,
    }).returning('id');
    return data;
  }
}
module.exports = new StoragesRepositories();
