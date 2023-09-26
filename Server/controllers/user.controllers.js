const { validationResult } = require("express-validator");
const UserService = require("../services/user.services");

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const result = await UserService.login(username, password);
    if (result.error.length > 0) {
      res.status(401).json({ message: result.error });
    } else {
      res.status(200).json({ token: result.token, message: result.success });
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.register = async (req, res) => {
  const { username, password, nombre, role_id } = req.body;

  try {
    const result = await UserService.registerUser(
      username,
      password,
      nombre,
      role_id
    );
    if (result.error.length > 0) {
      res.status(400).json({ message: result.error });
    } else {
      res.status(201).json({ message: result.success });
    }
  } catch (error) {
    console.error("Error en el registro de usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
