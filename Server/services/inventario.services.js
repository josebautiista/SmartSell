const inventarioRepository = require("../repositories/inventario.repositories");

exports.getInventario = (callback) => {
  inventarioRepository.getInventario((err, result) => {
    if (err) {
      return callback(err, null);
    } else {
      return callback(null, result);
    }
  });
};
