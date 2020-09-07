const db = require('../../database/connection');

class SuperUsersRepository {
  async findUserById(id) {
    const superUser = await db('super_users').where('id', id);
    return superUser;
  }

  async findByEmail(email) {
    const superUser = await db('super_users').where('email', email);
    return superUser;
  }

  async updateLastLogin({ id, hour }) {
    const superUser = await db('super_users').update({
      lastLogin: hour,
    }).where('id', id);
    return superUser;
  }
}
module.exports = new SuperUsersRepository();
