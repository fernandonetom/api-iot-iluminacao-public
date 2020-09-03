require('dotenv').config();
const validator = require('email-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment-timezone');
const OrganizationsRepositories = require('../repositories/OrganizationsRepositories');
const SuperUsersRepositories = require('../repositories/SuperUsersRepositories');
const ErrorsCatalog = require('../utils/ErrorsCatalog');
const MessageCatalog = require('../utils/MessageCatalog');

class OrganizationController {
  async index(req, res) {
    const organizations = await OrganizationsRepositories.index();
    res.json(organizations);
  }

  async store(req, res) {
    const {
      name, email, password, superUserId,
    } = req.body;

    if (!name || !email || !password || !superUserId) return res.json({ error: 'Null data', message: 'Campos em branco' });

    if (!validator.validate(email)) return res.json({ error: 'Inválid email', message: 'Email inválido' });

    const findSuperUser = await SuperUsersRepositories.findUserById(superUserId);
    if (findSuperUser.length === 0) {
      return res.json({ error: 'SuperUser not founded', message: 'Super usuário não existe' });
    }

    const findEmail = await OrganizationsRepositories.findOrganizationByEmail(email);
    if (findEmail.length > 0) {
      return res.json({ error: 'Email already in use', message: 'Email em uso' });
    }

    try {
      const passwordHash = await bcrypt.hash(password, 10);
      const orgId = await OrganizationsRepositories.create({
        name, email, password: passwordHash, superUserId,
      });
      res.json({ organizationId: orgId });
    } catch (error) {
      res.json({ error: error.code, message: error.message });
    }
  }

  async signIn(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ error: 'Null data', message: 'Campos em branco' });
    if (!validator.validate(email)) return res.json({ error: 'Inválid email', message: 'Email inválido' });
    const organization = await OrganizationsRepositories.findOrganizationByEmail(email);

    if (organization.length === 0) {
      return res.json(ErrorsCatalog.organization.notFound);
    }

    const compare = await bcrypt.compare(password, organization[0].password);

    if (!compare) return res.json({ error: 'Login error', message: 'Senha inválida' });

    try {
      await OrganizationsRepositories.updateLastLogin({ id: organization[0].id, hour: moment.utc().format() });
    } catch (error) {
      return res.json(ErrorsCatalog.server(error));
    }

    const token = jwt.sign({
      orgId: organization[0].id,
    }, process.env.SECRET, { expiresIn: 60 * 60 });

    res.json({ organizationId: organization[0].id, token });
  }

  async delete(req, res) {
    const { id } = req.params;
    const { superUserId } = req.body;
    if (!id || !superUserId) return res.json(ErrorsCatalog.organization.idNotFound);

    const findSuperUser = await SuperUsersRepositories.findUserById(superUserId);
    if (findSuperUser.length === 0) {
      return res.json(ErrorsCatalog.superuser.userNotFound);
    }

    try {
      const findOrg = await OrganizationsRepositories.findById(id);
      if (findOrg.length === 0) return res.json(ErrorsCatalog.organization.notFound);
    } catch (error) {
      res.json(ErrorsCatalog.server(error));
    }

    try {
      await OrganizationsRepositories.delete(id);
      res.json(MessageCatalog.deleted);
    } catch (error) {
      res.json(ErrorsCatalog.server(error));
    }
  }

  async update(req, res) {
    const {
      name, email, password, superUserId,
    } = req.body;

    const { id } = req.params;

    if (!id || !name || !email || !superUserId) return res.json(ErrorsCatalog.nullData);

    if (!validator.validate(email)) return res.json(ErrorsCatalog.emailInvalid);

    const findEmail = await OrganizationsRepositories.findOrganizationByEmail(email);

    if (findEmail.length > 0 && findEmail[0].id !== parseFloat(id)) {
      return res.json(ErrorsCatalog.emailInUser);
    }

    let newPassword;
    if (!password) {
      const findPassword = await OrganizationsRepositories.findById(id);
      newPassword = findPassword[0].password;
    } else {
      newPassword = await bcrypt.hash(password, 10);
    }

    try {
      await OrganizationsRepositories.update({
        id, name, email, password: newPassword,
      });
      res.json(MessageCatalog.updated);
    } catch (error) {
      res.json({ error: error.code, message: error.message });
    }
  }
}
module.exports = new OrganizationController();
