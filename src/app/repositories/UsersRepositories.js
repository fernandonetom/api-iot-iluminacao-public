const db = require('../../database/connection');

class UsersRepository {
  async index() {
    const users = await db('users')
      .select('users.id', 'users.name', 'users.level',
        'users.createdAt', 'users.lastLogin', 'users.organization_id',
        'organizations.name AS organization_name')
      .join('organizations', 'users.organization_id', '=', 'organizations.id');
    return users;
  }

  async findUserByEmail(email) {
    const user = await db('users').where('email', email);
    return user;
  }

  async findById(id) {
    const user = await db('users').where('id', id);
    return user;
  }

  async findByOrgId(orgId) {
    const users = await db('users').select('id', 'name', 'email', 'createdAt', 'lastLogin', 'organization_id').where('organization_id', orgId);
    return users;
  }

  async create({
    name, email, password, level, organizationId,
  }) {
    const id = await db('users').insert({
      name,
      email,
      password,
      level,
      organization_id: organizationId,
    }).returning('id');
    return id[0];
  }

  async updateLastLogin({ id, hour }) {
    const user = await db('users').update({
      lastLogin: hour,
    }).where('id', id);
    return user;
  }

  async delete(id) {
    const deleted = await db('users').where('id', id).del();
    return deleted;
  }

  async update({
    id, name, email, password, level,
  }) {
    const update = await db('users').update({
      name,
      email,
      password,
      level,
    }).where('id', id);
    return update;
  }
}
module.exports = new UsersRepository();
