const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/users.repositories");
const userRoleRepository = require("../repositories/roles.repositories");

exports.login = async (username, password) => {
  const messages = { success: [], error: [] }; // Objeto para mensajes

  const user = await userRepository.findByUsername(username);
  if (!user) {
    messages.error.push("Nombre de usuario o contraseña incorrectos");
    return messages; // Devuelve el objeto de mensajes
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    messages.error.push("Nombre de usuario o contraseña incorrectos");
    return messages; // Devuelve el objeto de mensajes
  }

  const token = jwt.sign({ userId: user.user_id }, "secret", {
    expiresIn: "1h",
  });

  messages.success.push("Inicio de sesión exitoso");
  messages.token = token; // Agrega el token al objeto de mensajes

  return messages; // Devuelve el objeto de mensajes
};

exports.registerUser = async (username, password, nombre, role_id) => {
  const messages = { success: [], error: [] }; // Objeto para mensajes

  const existingUser = await userRepository.findByUsername(username);
  if (existingUser) {
    messages.error.push("El nombre de usuario ya está en uso.");
    return messages; // Devuelve el objeto de mensajes
  }

  const userId = await userRepository.createUser(username, password, nombre);

  await userRoleRepository.assignRoleToUser(userId, role_id);

  messages.success.push("Usuario registrado exitosamente");

  return messages; // Devuelve el objeto de mensajes
};
