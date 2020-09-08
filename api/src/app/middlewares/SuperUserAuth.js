const jwt = require('jsonwebtoken');
const ErrorsCatalog = require('../utils/ErrorsCatalog');

class UsersAuth {
  async verify(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json(ErrorsCatalog.unAuthorized.tokenNotFound);

    const jwtToken = token.split(' ')[1];
    try {
      const { superUserId } = jwt.verify(jwtToken, process.env.SECRET_SUPERUSER);
      req.body.superUserId = superUserId;
      next();
    } catch (err) {
      res.status(401).json(ErrorsCatalog.unAuthorized.invalidToken);
    }
  }
}
module.exports = new UsersAuth();
