// controllers/userController.js
const { validationResult } = require("express-validator");
const UserService = require("../services/user.services");

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const token = await UserService.login(username, password);
    res.status(200).json({ token, message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(401).json({ message: error });
  }
};

exports.register = async (req, res) => {
  const { username, password, nombre, role_id } = req.body;

  try {
    const message = await UserService.registerUser(
      username,
      password,
      nombre,
      role_id
    );
    res.status(201).json({ message });
  } catch (error) {
    console.error("Error en el registro de usuario:", error);
    res.status(400).json({ message: error });
  }
};
