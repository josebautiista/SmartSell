const connection = require("../db");
const bcrypt = require("bcrypt");

class UserRepository {
  constructor(connection) {
    this.connection = connection;
  }

  async findByUsername(username) {
    const consult = "SELECT * FROM users WHERE username = ?";
    return new Promise((resolve, reject) => {
      this.connection.query(consult, [username], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result[0]);
        }
      });
    });
  }

  async createUser(username, password, nombre) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
      this.connection.query(
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

module.exports = UserRepository;
