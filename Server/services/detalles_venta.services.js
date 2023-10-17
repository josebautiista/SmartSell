const detallesVentaRepository = require("../repositories/detalles_venta.repositories");

exports.getDetallesVenta = (ventaId, callback) => {
  detallesVentaRepository.getDetallesVenta(ventaId, (error, results) => {
    if (error) {
      return callback(error, null);
    } else {
      return callback(null, results);
    }
  });
};
