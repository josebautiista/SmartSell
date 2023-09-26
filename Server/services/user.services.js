// services/userService.js
const bcrypt = require("bcrypt");
const connection = require("../db");
const jwt = require("jsonwebtoken");

exports.login = async (username, password) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length === 0) {
          reject("Nombre de usuario o contraseña incorrectos");
        } else {
          const isPasswordValid = await bcrypt.compare(
            password,
            results[0].password
          );
          if (!isPasswordValid) {
            reject("Nombre de usuario o contraseña incorrectos");
          } else {
            const token = jwt.sign({ userId: results[0].id }, "secret", {
              expiresIn: "1h",
            });
            resolve(token);
          }
        }
      }
    );
  });
};

exports.registerUser = (username, password, nombre, role_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (error, results) => {
        if (error) {
          reject(error);
        } else if (results.length > 0) {
          reject("El nombre de usuario ya está en uso.");
        } else {
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              reject(err);
            } else {
              connection.query(
                "INSERT INTO users (username, password, nombre) VALUES (?, ?, ?)",
                [username, hash, nombre],
                (error, userInsertResult) => {
                  if (error) {
                    reject(error);
                  } else {
                    const userId = userInsertResult.insertId;
                    connection.query(
                      "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)",
                      [userId, role_id],
                      (error) => {
                        if (error) {
                          reject(error);
                        } else {
                          resolve("Usuario registrado exitosamente.");
                        }
                      }
                    );
                  }
                }
              );
            }
          });
        }
      }
    );
  });
};
