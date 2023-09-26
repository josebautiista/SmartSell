// user.routes.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controllers");
const { body } = require("express-validator");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
