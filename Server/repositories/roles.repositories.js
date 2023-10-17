const connection = require("../db");

class UserRoleRepository {
  async assignRoleToUser(userId, roleId) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)",
        [userId, roleId],
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        }
      );
    });
  }
}

module.exports = new UserRoleRepository();
