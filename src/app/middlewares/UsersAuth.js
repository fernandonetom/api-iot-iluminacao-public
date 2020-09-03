const jwt = require('jsonwebtoken');
const UsersRepositories = require('../repositories/UsersRepositories');
const ErrorsCatalog = require('../utils/ErrorsCatalog');

class UsersAuth {
  async verify(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json(ErrorsCatalog.unAuthorized.tokenNotFound);

    const jwtToken = token.split(' ')[1];
    try {
      const { userId, userLevel, orgId } = jwt.verify(jwtToken, process.env.SECRET);
      req.body.userId = userId;
      req.body.userLevel = userLevel;
      req.body.orgId = orgId;
      next();
    } catch (err) {
      res.status(401).json(ErrorsCatalog.unAuthorized.invalidToken);
    }
  }

  async isAdmin(req, res, next) {
    const { userId } = req.body;
    if (!userId) return res.status(401).json(ErrorsCatalog.user.notInformed);

    const user = await UsersRepositories.findById(userId);

    if (user.length === 0) return res.status(401).json(ErrorsCatalog.user.notFound);

    const isAdmin = user[0].level === 'admin';

    if (!isAdmin) return res.status(401).json(ErrorsCatalog.unAuthorized.notPermissions);

    next();
  }
}
module.exports = new UsersAuth();
