const ventasRepository = require("../repositories/ventas.repositories");

exports.getVentas = (callback) => {
  ventasRepository.getVentas((err, resultados) => {
    return callback(err, resultados);
  });
};

exports.crearVenta = (ventaData, callback) => {
  ventasRepository.crearVenta(ventaData, (err, resultado) => {
    return callback(err, resultado);
  });
};

exports.getVentasPorFecha = (fecha, callback) => {
  ventasRepository.getVentasPorFecha(fecha, (err, resultados) => {
    return callback(err, resultados);
  });
};
