require('dotenv').config();
const validator = require('email-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const UsersRepositories = require('../repositories/UsersRepositories');
const OrganizationsRepositories = require('../repositories/OrganizationsRepositories');
const ErrorsCatalog = require('../utils/ErrorsCatalog');
const MessageCatalog = require('../utils/MessageCatalog');

class UserController {
  async index(req, res) {
    const { orgId } = req.body;
    const users = await UsersRepositories.findByOrgId(orgId);
    res.json(users);
  }

  async signIn(req, res) {
    const { email, password, remember } = req.body;
    if (!email || !password) return res.json({ error: 'Null data', message: 'Campos em branco' });
    if (!validator.validate(email)) return res.json({ error: 'Inválid email', message: 'Email inválido' });

    const user = await UsersRepositories.findUserByEmail(email);

    if (user.length === 0) return res.json({ error: 'User not founded', message: 'Usuário não cadastrado' });

    const compare = await bcrypt.compare(password, user[0].password);

    if (!compare) return res.json({ error: 'Login error', message: 'Senha inválida' });

    const expiresIn = remember ? '1 years' : 60 * 60;

    try {
      await UsersRepositories.updateLastLogin({ id: user[0].id, hour: moment.utc().format() });
    } catch (error) {
      return res.json(ErrorsCatalog.server(error));
    }

    const token = jwt.sign({
      userId: user[0].id,
      orgId: user[0].organization_id,
      userLevel: user[0].level,
    }, process.env.SECRET, { expiresIn });

    res.json({ userId: user[0].id, token });
  }

  async store(req, res) {
    const {
      name, email, password, admin, organizationId,
    } = req.body;
    const level = admin ? 'admin' : 'user';

    if (!name || !email || !password || !organizationId) return res.json({ error: 'Null data', message: 'Campos em branco' });

    if (!validator.validate(email)) return res.json({ error: 'Inválid email', message: 'Email inválido' });

    const findOrg = await OrganizationsRepositories.findById(organizationId);

    if (findOrg.length === 0) {
      return res.json({ error: 'Organization not founded', message: 'Organização não encontrada' });
    }

    const findEmail = await UsersRepositories.findUserByEmail(email);
    if (findEmail.length > 0) {
      return res.json({ error: 'Email already in use', message: 'Email em uso' });
    }

    try {
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await UsersRepositories.create({
        name, email, password: passwordHash, level, organizationId,
      });
      res.json({ userId: user });
    } catch (error) {
      res.json({ error: error.code, message: error.message });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    const { orgId } = req.body;
    if (!id || !orgId) return res.json(ErrorsCatalog.user.notInformed);

    try {
      const findOrg = await OrganizationsRepositories.findById(orgId);
      if (findOrg.length === 0) return res.json(ErrorsCatalog.organization.notFound);
    } catch (error) {
      res.json(ErrorsCatalog.server(error));
    }

    try {
      const findUser = await UsersRepositories.findById(id);
      if (findUser.length === 0) return res.json(ErrorsCatalog.user.notFound);
      if (findUser[0].organization_id !== parseFloat(orgId)) {
        return res.json(ErrorsCatalog.unAuthorized.notPermissions);
      }
    } catch (error) {
      res.json(ErrorsCatalog.server(error));
    }

    try {
      await UsersRepositories.delete(id);
      return res.json(MessageCatalog.deleted);
    } catch (error) {
      return res.json(ErrorsCatalog.server(error));
    }
  }

  async update(req, res) {
    const {
      name, email, password, admin, orgId,
    } = req.body;

    const level = admin ? 'admin' : 'user';

    const { id } = req.params;

    if (!id || !name || !email || !orgId) return res.json(ErrorsCatalog.nullData);

    if (!validator.validate(email)) return res.json(ErrorsCatalog.emailInvalid);

    const findEmail = await UsersRepositories.findUserByEmail(email);

    if (findEmail.length > 0 && findEmail[0].id !== parseFloat(id)) {
      return res.json(ErrorsCatalog.emailInUser);
    }

    let newPassword;
    if (!password) {
      const findPassword = await UsersRepositories.findById(id);
      newPassword = findPassword[0].password;
    } else {
      newPassword = await bcrypt.hash(password, 10);
    }

    try {
      await UsersRepositories.update({
        id, name, email, level, password: newPassword,
      });
      res.json(MessageCatalog.updated);
    } catch (error) {
      res.json({ error: error.code, message: error.message });
    }
  }
}
module.exports = new UserController();
