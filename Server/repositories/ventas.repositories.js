const connection = require("../db");

exports.getVentas = (callback) => {
  const query = `
    SELECT v.*, c.nombre AS nombre_cliente, c.telefono AS telefono_cliente, c.email AS email_cliente,
    mp.nombre AS nombre_medio_pago, v.cantidad_pago
    FROM Ventas v
    JOIN Clientes c ON v.cliente_id = c.cliente_id
    JOIN Medios_De_Pago mp ON v.medio_pago_id = mp.id`;

  connection.query(query, (error, results) => {
    if (error) {
      return callback("Error al obtener las ventas");
    } else {
      return callback(null, results);
    }
  });
};

exports.crearVenta = (ventaData, callback) => {
  const { cliente_id, detalles, medio_pago_id, cantidad_pago } = ventaData;

  let ventaExitosa = true;

  const insertVentaQuery =
    "INSERT INTO Ventas (cliente_id, fecha_hora, total, medio_pago_id, cantidad_pago) VALUES (?, NOW(), 0, ?, ?)";

  connection.query(
    insertVentaQuery,
    [cliente_id, medio_pago_id, cantidad_pago],
    (error, result) => {
      if (error) {
        ventaExitosa = false;
        return callback("Error al insertar la venta");
      } else {
        const venta_id = result.insertId;

        const insertDetallesQuery =
          "INSERT INTO Detalles_Venta (venta_id, producto_id, cantidad, precio_venta, valor_total, mesa_id) VALUES (?,?, ?, ?, ?, ?)";

        detalles.forEach((detalle) => {
          const { producto_id, cantidad, precio_venta, valor_total, mesa_id } =
            detalle;

          const values = [
            venta_id,
            producto_id,
            cantidad,
            precio_venta,
            valor_total,
            mesa_id,
          ];

          connection.query(insertDetallesQuery, values, (error) => {
            if (error) {
              ventaExitosa = false;
            }
          });
        });

        const updateVentaQuery =
          "UPDATE Ventas SET total = (SELECT SUM(Detalles_Venta.valor_total) FROM Detalles_Venta WHERE Detalles_Venta.venta_id = ?) WHERE venta_id = ?";
        connection.query(updateVentaQuery, [venta_id, venta_id], (error) => {
          if (error) {
            ventaExitosa = false;
          }
        });
      }

      if (ventaExitosa) {
        return callback(null, "Nueva venta creada con éxito");
      } else {
        return callback("Error al realizar la venta");
      }
    }
  );
};

exports.getVentasPorFecha = (fecha, callback) => {
  let query = `
    SELECT v.*, c.nombre AS nombre_cliente, c.telefono AS telefono_cliente, c.email AS email_cliente,
    mp.nombre AS nombre_medio_pago, v.cantidad_pago
    FROM Ventas v
    JOIN Clientes c ON v.cliente_id = c.cliente_id
    JOIN Medios_De_Pago mp ON v.medio_pago_id = mp.id`;

  if (fecha) {
    query += ` WHERE DATE(v.fecha_hora) = ?`;
  }

  connection.query(query, [fecha], (error, results) => {
    if (error) {
      return callback("Error al obtener las ventas");
    } else {
      return callback(null, results);
    }
  });
};
