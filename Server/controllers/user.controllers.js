const UserService = require("../services/user.services");
const UserRepository = require("../repositories/users.repositories");
const connection = require("../db");

const userRepository = new UserRepository(connection);
const userService = new UserService(userRepository);

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await userService.login(username, password);

    if (result.token) {
      res.send(result);
    } else {
      res.status(401).send(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.register = async (req, res) => {
  const { username, password, nombre, role_id } = req.body;

  try {
    const result = await userService.registerUser(
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
