const productosCategoria = require("../repositories/productos.repositories");

exports.getProductosPorCategoria = (categoriaId, callback) => {
  productosCategoria.getProductosPorCategoria(categoriaId, (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });
};
