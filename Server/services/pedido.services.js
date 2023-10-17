const carritoRepository = require("../repositories/pedido.repositories");

exports.actualizarCantidad = (mesaId, productoId, cantidad, callback) => {
  carritoRepository.actualizarCantidad(
    mesaId,
    productoId,
    cantidad,
    (err, result) => {
      return callback(err, result);
    }
  );
};

exports.actualizarPrecio = (mesaId, productoId, precioVenta, callback) => {
  carritoRepository.actualizarPrecio(
    mesaId,
    productoId,
    precioVenta,
    (err, result) => {
      return callback(err, result);
    }
  );
};

exports.getProductosEnMesa = (mesaId, callback) => {
  carritoRepository.getProductosEnMesa(mesaId, (err, result) => {
    return callback(err, result);
  });
};

exports.getProductoExiste = (mesaId, productoId, callback) => {
  carritoRepository.getProductoExiste(mesaId, productoId, (err, result) => {
    return callback(err, result);
  });
};

exports.agregarProductoEnMesa = (
  mesaId,
  productoId,
  cantidad,
  precioVenta,
  callback
) => {
  carritoRepository.agregarProductoEnMesa(
    mesaId,
    productoId,
    cantidad,
    precioVenta,
    (err, result) => {
      return callback(err, result);
    }
  );
};

exports.eliminarProductoDeMesa = (mesaId, productoId, callback) => {
  carritoRepository.eliminarProductoDeMesa(
    mesaId,
    productoId,
    (err, result) => {
      return callback(err, result);
    }
  );
};

exports.vaciarMesa = (mesaId, callback) => {
  carritoRepository.vaciarMesa(mesaId, (err, result) => {
    return callback(err, result);
  });
};

exports.cambiarMesa = (mesaActual, nuevaMesa, callback) => {
  carritoRepository.cambiarMesa(mesaActual, nuevaMesa, (err, result) => {
    return callback(err, result);
  });
};
