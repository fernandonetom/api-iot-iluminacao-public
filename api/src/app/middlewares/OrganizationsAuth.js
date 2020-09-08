const jwt = require('jsonwebtoken');
const OrganizationsRepositories = require('../repositories/OrganizationsRepositories');
const ErrorsCatalog = require('../utils/ErrorsCatalog');

class OrganizationsAuth {
  async verify(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json(ErrorsCatalog.unAuthorized.tokenNotFound);

    const jwtToken = token.split(' ')[1];
    try {
      const { orgId } = jwt.verify(jwtToken, process.env.SECRET_ORGANIZATIONS);

      const findOrg = await OrganizationsRepositories.findById(orgId);

      if (findOrg.length === 0) return res.json(ErrorsCatalog.organization.notFound);

      req.body.orgId = orgId;
      next();
    } catch (err) {
      res.status(401).json(ErrorsCatalog.unAuthorized.invalidToken);
    }
  }
}
module.exports = new OrganizationsAuth();
