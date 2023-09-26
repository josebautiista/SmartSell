//user.repositories.js
const connection = require("../db");

module.exports = {
  getUserByUsername: (username) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (error, results) => {
          if (error) {
            reject(error);
            console.error("Error en getUserByUsername:", error); // Agregamos un registro de depuración
          } else {
            resolve(results);
            console.log("Resultados de getUserByUsername:", results); // Agregamos un registro de depuración
          }
        }
      );
    });
  },

  insertUser: (username, hashedPassword, nombre) => {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO users (username, password, nombre) VALUES (?, ?, ?)",
        [username, hashedPassword, nombre],
        (error, userInsertResult) => {
          if (error) {
            reject(error);
          } else {
            resolve(userInsertResult.insertId); // Devuelve el ID del usuario insertado
          }
        }
      );
    });
  },
};
