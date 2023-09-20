const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controllers");
const { body } = require("express-validator");

router.post("/register", UserController.register);
router.post(
  "/login",
  [
    body("username")
      .notEmpty()
      .withMessage("Por favor, ingresa un nombre de usuario válido"),
    body("password")
      .notEmpty()
      .withMessage("Por favor, ingresa una contraseña válida"),
  ],
  UserController.login
);

module.exports = router;
