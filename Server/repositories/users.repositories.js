// repositories/userRepository.js

const connection = require("../db");
const bcrypt = require("bcrypt");

class UserRepository {
  async findByUsername(username) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0] || null);
          }
        }
      );
    });
  }

  async createUser(username, password, nombre) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO users (username, password, nombre) VALUES (?, ?, ?)",
        [username, hashedPassword, nombre],
        (error, userInsertResult) => {
          if (error) {
            reject(error);
          } else {
            const userId = userInsertResult.insertId;
            resolve(userId);
          }
        }
      );
    });
  }
}

module.exports = new UserRepository();
