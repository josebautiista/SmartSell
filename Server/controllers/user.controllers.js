// controllers/userController.js
const bcrypt = require("bcrypt");
const connection = require("../db");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (error, results) => {
        if (error) throw error;

        if (results.length === 0) {
          return res
            .status(401)
            .json({ message: "Nombre de usuario o contraseña incorrectos" });
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          results[0].password
        );

        if (!isPasswordValid) {
          return res
            .status(401)
            .json({ message: "Nombre de usuario o contraseña incorrectos" });
        }

        const token = jwt.sign({ userId: results[0].id }, "secret", {
          expiresIn: "1h",
        });

        res.status(200).json({ token, message: "Inicio de sesión exitoso" });
      }
    );
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.register = (req, res) => {
  const { username, password, nombre, role_id } = req.body;
  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (error, results) => {
      if (error) throw error;

      if (results.length > 0) {
        return res
          .status(400)
          .json({ message: "El nombre de usuario ya está en uso." });
      }

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;

        connection.query(
          "INSERT INTO users (username, password, nombre) VALUES (?, ?, ?)",
          [username, hash, nombre],
          (error, userInsertResult) => {
            if (error) throw error;

            const userId = userInsertResult.insertId;

            connection.query(
              "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)",
              [userId, role_id],
              (error) => {
                if (error) throw error;

                return res
                  .status(201)
                  .json({ message: "Usuario registrado exitosamente." });
              }
            );
          }
        );
      });
    }
  );
};
