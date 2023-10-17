const connection = require("../db");

exports.actualizarCantidad = (mesaId, productoId, cantidad, callback) => {
  if (typeof cantidad !== "number" || isNaN(cantidad)) {
    return callback("La cantidad debe ser un número válido.");
  }

  const updateQuery =
    "UPDATE pedido SET cantidad = ? WHERE mesa_id = ? AND producto_id = ?";
  connection.query(
    updateQuery,
    [cantidad, mesaId, productoId],
    (error, results) => {
      if (error) {
        return callback(
          "Error al actualizar la cantidad del producto en la mesa"
        );
      }
      callback(null, "Cantidad del producto actualizada correctamente");
    }
  );
};

exports.actualizarPrecio = (mesaId, productoId, precioVenta, callback) => {
  if (typeof precioVenta !== "number" || isNaN(precioVenta)) {
    return callback("El precio de venta debe ser un número válido.");
  }

  const updateQuery =
    "UPDATE pedido SET precio_venta = ? WHERE mesa_id = ? AND producto_id = ?";
  connection.query(
    updateQuery,
    [precioVenta, mesaId, productoId],
    (error, results) => {
      if (error) {
        return callback(
          "Error al actualizar el precio del producto en la mesa"
        );
      }
      callback(null, "Precio del producto actualizado correctamente");
    }
  );
};

exports.getProductosEnMesa = (mesaId, callback) => {
  const query = `
    SELECT cc.*, p.* 
    FROM pedido cc
    JOIN productos p ON cc.producto_id = p.producto_id
    WHERE cc.mesa_id = ?`;
  connection.query(query, [mesaId], (error, results) => {
    if (error) {
      return callback("Error al obtener productos en pedido");
    }
    callback(null, results);
  });
};

exports.getProductoExiste = (mesaId, productoId, callback) => {
  const query = "SELECT * FROM pedido WHERE mesa_id = ? AND producto_id = ?";
  connection.query(query, [mesaId, productoId], (error, results) => {
    if (error) {
      return callback("Error al obtener el producto en pedido");
    }
    const productoEnCarrito = results[0];
    callback(null, productoEnCarrito);
  });
};

exports.agregarProductoEnMesa = (
  mesaId,
  productoId,
  cantidad,
  precioVenta,
  callback
) => {
  connection.query(
    "SELECT * FROM pedido WHERE mesa_id = ? AND producto_id = ?",
    [mesaId, productoId],
    (error, results) => {
      if (error) {
        return callback("Error al consultar el producto en la mesa");
      }

      if (results.length > 0) {
        const cantidadActual = results[0].cantidad;
        const nuevaCantidad = cantidadActual + cantidad;
        connection.query(
          "UPDATE pedido SET cantidad = ? WHERE mesa_id = ? AND producto_id = ?",
          [nuevaCantidad, mesaId, productoId],
          (error, results) => {
            if (error) {
              return callback(
                "Error al aumentar la cantidad del producto en la mesa"
              );
            }
            callback(null, "Cantidad del producto actualizada en la mesa");
          }
        );
      } else {
        connection.query(
          "INSERT INTO pedido (mesa_id, producto_id, cantidad, precio_venta) VALUES (?, ?, ?, ?)",
          [mesaId, productoId, cantidad, precioVenta],
          (error, results) => {
            if (error) {
              return callback("Error al insertar el producto en la mesa");
            }
            callback(null, "Producto agregado a la mesa");
          }
        );
      }
    }
  );
};

exports.eliminarProductoDeMesa = (mesaId, productoId, callback) => {
  const deleteQuery =
    "DELETE FROM pedido WHERE mesa_id = ? AND producto_id = ?";
  connection.query(deleteQuery, [mesaId, productoId], (error, results) => {
    if (error) {
      return callback("Error al eliminar el producto de la mesa");
    }
    if (results.affectedRows > 0) {
      callback(null, "Producto eliminado de la mesa correctamente");
    } else {
      callback("El producto no se encontraba en la mesa");
    }
  });
};

exports.vaciarMesa = (mesaId, callback) => {
  const deleteQuery = "DELETE FROM pedido WHERE mesa_id = ?";
  connection.query(deleteQuery, [mesaId], (error, results) => {
    if (error) {
      return callback("Error al vaciar la mesa");
    }
    if (results.affectedRows > 0) {
      callback(null, "mesa vacia correctamente");
    } else {
      callback("La mesa ya estaba vacía");
    }
  });
};

exports.cambiarMesa = (mesaActual, nuevaMesa, callback) => {
  const updateQuery = "UPDATE pedido SET mesa_id = ? WHERE mesa_id = ?";
  connection.query(updateQuery, [nuevaMesa, mesaActual], (error, results) => {
    if (error) {
      return callback("Error al cambiar la mesa");
    }
    callback(
      null,
      `${results.affectedRows} productos cambiados de mesa exitosamente`
    );
  });
};
