const connection = require("../db");

class CategoriasRepository {
  constructor() {}

  getCategorias(callback) {
    connection.query("SELECT * FROM categorias", (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  }
}

module.exports = CategoriasRepository;
