const db = require("../../database/connection");
const { set, getAsync } = require("../../database/redis");
class OrganizationsRepositories {
  async index() {
    const key = `OrganizationsRepositories.index()`;
    const cache = await getAsync(key);
    if (cache) {
      return cache;
    } else {
      const organizations = await db("organizations").select(
        "id",
        "name",
        "email",
        "createdAt",
        "lastLogin",
        "superuser_id"
      );
      set(key, organizations, 60);
      return organizations;
    }
  }

  async findOrganizationByEmail(email) {
    const key = `OrganizationsRepositories.findOrganizationByEmail(${email})`;
    const cache = await getAsync(key);
    if (cache) {
      return cache;
    } else {
      const organization = await db("organizations").where("email", email);
      set(key, organization, 60);
      return organization;
    }
  }

  async findById(id) {
    const key = `OrganizationsRepositories.findById(${id})`;
    const cache = await getAsync(key);
    if (cache) {
      return cache;
    } else {
      const organization = await db("organizations").where("id", id);
      set(key, organization, 60);
      return organization;
    }
  }

  async create({ name, email, password, superUserId }) {
    const id = await db("organizations")
      .insert({
        name,
        email,
        password,
        superuser_id: superUserId,
      })
      .returning("id");
    return id[0];
  }

  async delete(id) {
    const deletedRow = await db("organizations").where("id", id).del();
    return deletedRow;
  }

  async updateLastLogin({ id, hour }) {
    const organization = await db("organizations")
      .update({
        lastLogin: hour,
      })
      .where("id", id);
    return organization;
  }

  async update({ id, name, email, password }) {
    const update = await db("organizations")
      .update({
        name,
        email,
        password,
      })
      .where("id", id);
    return update;
  }
}
module.exports = new OrganizationsRepositories();
