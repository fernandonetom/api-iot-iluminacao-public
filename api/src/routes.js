const { Router } = require("express");
const UserController = require("./app/controllers/UserController");
const OrganizationController = require("./app/controllers/OrganizationController");
const UsersAuth = require("./app/middlewares/UsersAuth");
const SuperUserAuth = require("./app/middlewares/SuperUserAuth");
const SuperUserController = require("./app/controllers/SuperUserController");
const MqttUserController = require("./app/controllers/MqttUserController");
const OrganizationsAuth = require("./app/middlewares/OrganizationsAuth");
const StorageController = require("./app/controllers/StorageController");
const StatController = require("./app/controllers/StatController");

const router = Router();

router.get("/users", OrganizationsAuth.verify, UserController.index);
router.get("/users/profile", UsersAuth.verify, UserController.profile);
router.post("/users", OrganizationsAuth.verify, UserController.store);
router.put("/users/:id", OrganizationsAuth.verify, UserController.update);
router.delete("/users/:id", OrganizationsAuth.verify, UserController.delete);
router.post("/users/signin", UserController.signIn);

router.post("/organizations/signin", OrganizationController.signIn);

router.get(
  "/mqttusers",
  UsersAuth.verify,
  UsersAuth.isAdmin,
  MqttUserController.index
);
router.post("/mqttusers", UsersAuth.verify, MqttUserController.store);
router.put(
  "/mqttusers/:id",
  UsersAuth.verify,
  UsersAuth.isAdmin,
  MqttUserController.update
);
router.delete(
  "/mqttusers/:id",
  UsersAuth.verify,
  UsersAuth.isAdmin,
  MqttUserController.delete
);

router.post("/storage/create/:tipo", StorageController.store);
router.post("/storage/list/:tipo", UsersAuth.verify, StorageController.index);

router.post("/superuser/signin", SuperUserController.signIn);
router.get(
  "/superuser/organizations",
  SuperUserAuth.verify,
  OrganizationController.index
);
router.post(
  "/superuser/organizations",
  SuperUserAuth.verify,
  OrganizationController.store
);
router.put(
  "/superuser/organizations/:id",
  SuperUserAuth.verify,
  OrganizationController.update
);
router.delete(
  "/superuser/organizations/:id",
  SuperUserAuth.verify,
  OrganizationController.delete
);

router.get("/stats", StatController.index);
router.post("/stats", StatController.create);
module.exports = router;
