const express = require("express");
const router = express.Router();
const rolesController = require("./../controllers/roles.controllers");

router.get("/", rolesController.getAllRoles);

module.exports = router;
