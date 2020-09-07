require('dotenv').config();
const validator = require('email-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const SuperUsersRepositories = require('../repositories/SuperUsersRepositories');
const ErrorsCatalog = require('../utils/ErrorsCatalog');

class SuperUserController {
  async signIn(req, res) {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ error: 'Null data', message: 'Campos em branco' });
    if (!validator.validate(email)) return res.json({ error: 'Inválid email', message: 'Email inválido' });

    const user = await SuperUsersRepositories.findByEmail(email);

    if (user.length === 0) return res.json({ error: 'User not founded', message: 'Usuário não cadastrado' });

    const compare = await bcrypt.compare(password, user[0].password);

    if (!compare) return res.json({ error: 'Login error', message: 'Senha inválida' });

    const token = jwt.sign({
      superUserId: user[0].id,
    }, process.env.SECRET, { expiresIn: 60 * 30 });

    try {
      await SuperUsersRepositories.updateLastLogin({ id: user[0].id, hour: moment.utc().format() });
    } catch (error) {
      return res.json(ErrorsCatalog.server(error));
    }

    res.json({ superUserId: user[0].id, token });
  }
}
module.exports = new SuperUserController();
