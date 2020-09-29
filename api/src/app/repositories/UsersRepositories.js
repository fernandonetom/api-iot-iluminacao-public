const db = require("../../database/connection");
const { set, getAsync } = require("../../database/redis");
class UsersRepository {
  async index() {
    const key = `UsersRepository.index()`;
    const cache = await getAsync(key);
    if (cache) {
      return cache;
    } else {
      const users = await db("users")
        .select(
          "users.id",
          "users.name",
          "users.level",
          "users.createdAt",
          "users.lastLogin",
          "users.organization_id",
          "organizations.name AS organization_name"
        )
        .join(
          "organizations",
          "users.organization_id",
          "=",
          "organizations.id"
        );
      set(key, users || new Array(), 60);
      return data;
    }
  }

  async findUserByEmail(email) {
    const key = `UsersRepository.findUserByEmail(${email})`;
    const cache = await getAsync(key);
    if (cache) {
      return cache;
    } else {
      const user = await db("users").where("email", email);
      set(key, user, 60);
      return user;
    }
  }

  async findById(id) {
    const key = `UsersRepository.findById(${id})`;
    const cache = await getAsync(key);
    if (cache) {
      return cache;
    } else {
      const user = await db("users").where("id", id);
      set(key, user, 60);
      return user;
    }
  }

  async findByOrgId(orgId) {
    const key = `UsersRepository.findByOrgId(${orgId})`;
    const cache = await getAsync(key);
    if (cache) {
      return cache;
    } else {
      const users = await db("users")
        .select(
          "id",
          "name",
          "email",
          "createdAt",
          "level",
          "lastLogin",
          "organization_id"
        )
        .where("organization_id", orgId);
      set(key, users, 60);
      return users;
    }
  }

  async create({ name, email, password, level, organizationId }) {
    const id = await db("users")
      .insert({
        name,
        email,
        password,
        level,
        organization_id: organizationId,
      })
      .returning("id");
    return id[0];
  }

  async updateLastLogin({ id, hour }) {
    const user = await db("users")
      .update({
        lastLogin: hour,
      })
      .where("id", id);
    return user;
  }

  async delete(id) {
    const deleted = await db("users").where("id", id).del();
    return deleted;
  }

  async update({ id, name, email, password, level }) {
    const update = await db("users")
      .update({
        name,
        email,
        password,
        level,
      })
      .where("id", id);
    return update;
  }
}
module.exports = new UsersRepository();
