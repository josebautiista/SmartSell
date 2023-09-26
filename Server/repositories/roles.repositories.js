const connection = require("../db");

module.exports = {
  insertUserRole: (userId, roleId) => {
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
  },
  getRoleById: (roleId) => {
    console.log(roleId);
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM roles WHERE role_id = ?",
        [roleId],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  },
};
