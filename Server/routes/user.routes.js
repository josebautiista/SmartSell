const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controllers");
const jwt = require("jsonwebtoken");
const connection = require("../db");

const secretKey = "Stack";
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token de autenticación no proporcionado" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token no válido" });
    }
    req.user = user;
    next();
  });
};

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    console.log("user:", user.user_id);
    const userRole = await getUserRoleById(user.user_id);

    if (!userRole) {
      return res.status(404).json({ message: "Rol de usuario no encontrado" });
    }

    res.json({ user: { ...user, role: userRole.role_name } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

function getUserRoleById(userId) {
  return new Promise((resolve, reject) => {
    const sqlQuery =
      "SELECT r.role_name FROM users u JOIN user_roles ur ON u.user_id = ur.user_id JOIN roles r ON ur.role_id = r.role_id WHERE u.user_id = ?";
    connection.query(sqlQuery, [userId], (err, results) => {
      if (err) {
        console.error("Error al ejecutar la consulta:", err);
        reject(err);
      } else {
        if (results.length === 0) {
          console.log("No se encontraron resultados para el ID:", userId);
          resolve(null);
        } else {
          const resultado = results[0];
          console.log("Resultado encontrado:", resultado);
          resolve(resultado);
        }
      }
    });
  });
}

module.exports = router;
