const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/users.repositories");
const userRoleRepository = require("../repositories/roles.repositories");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async login(username, password) {
    try {
      const user = await this.userRepository.findByUsername(username);

      if (!user) {
        return { message: "Usuario o contraseña incorrectos" };
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        const token = jwt.sign({ username, user_id: user.user_id }, "Stack", {
          expiresIn: "1h",
        });
        return { message: "Inicio de sesión exitoso", token, user };
      } else {
        return { message: "Usuario o contraseña incorrectos" };
      }
    } catch (error) {
      console.error(error);
      throw new Error("Internal Server Error");
    }
  }

  async registerUser(username, password, nombre, role_id) {
    const messages = { success: [], error: [] };

    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      messages.error.push("El nombre de usuario ya está en uso.");
      return messages;
    }

    const userId = await this.userRepository.createUser(
      username,
      password,
      nombre
    );

    await userRoleRepository.assignRoleToUser(userId, role_id);

    messages.success.push("Usuario registrado exitosamente");

    return messages;
  }
}

module.exports = UserService;
