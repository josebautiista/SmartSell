const connection = require("../db");

exports.getInventario = (callback) => {
  const sql = `
    SELECT * FROM productos
  `;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error("Error al obtener los productos:", err);
      return callback(err, null);
    } else {
      return callback(null, result);
    }
  });
};
