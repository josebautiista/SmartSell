const connection = require("../db");

exports.getProductosPorCategoria = (categoriaId, callback) => {
  const query = "SELECT * FROM productos WHERE categoria_id = ?";
  connection.query(query, [categoriaId], (error, results) => {
    if (error) {
      return callback(
        "Error al realizar la consulta de productos por categoría."
      );
    }
    callback(null, results);
  });
};
