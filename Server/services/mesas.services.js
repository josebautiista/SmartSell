const mesasRepository = require("../repositories/mesas.repositories");
const { actualizarEstadoMesa } = require("../actualizarMesa");

exports.getMesas = (callback) => {
  mesasRepository.getMesas((err, result) => {
    if (err) {
      return callback(err, null);
    } else {
      result.forEach((res) => {
        actualizarEstadoMesa(res.mesa_id);
      });
      return callback(null, result);
    }
  });
};

exports.crearMesa = (capacidad, estado, callback) => {
  mesasRepository.crearMesa(capacidad, estado, (err, result) => {
    return callback(err, result);
  });
};
