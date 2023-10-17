const pedidoService = require("../services/pedido.services");

exports.actualizarCantidad = (req, res) => {
  const mesaId = req.params.mesa_id;
  const productoId = req.params.producto_id;
  const { cantidad } = req.body;

  pedidoService.actualizarCantidad(
    mesaId,
    productoId,
    cantidad,
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.status(200).json({ message: result });
    }
  );
};

exports.actualizarPrecio = (req, res) => {
  const mesaId = req.params.mesa_id;
  const productoId = req.params.producto_id;
  const { precio_venta } = req.body;

  pedidoService.actualizarPrecio(
    mesaId,
    productoId,
    precio_venta,
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.status(200).json({ message: result });
    }
  );
};

exports.getProductosEnMesa = (req, res) => {
  const mesaId = req.params.mesa_id;

  pedidoService.getProductosEnMesa(mesaId, (err, productos) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(productos);
  });
};

exports.getProductoExiste = (req, res) => {
  const mesaId = req.params.mesa_id;
  const productoId = req.params.producto_id;

  pedidoService.getProductoExiste(mesaId, productoId, (err, producto) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(200).json(producto);
  });
};

exports.agregarProductoEnMesa = (req, res) => {
  const { mesa_id, producto_id, cantidad, precio_venta } = req.body;

  pedidoService.agregarProductoEnMesa(
    mesa_id,
    producto_id,
    cantidad,
    precio_venta,
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      }
      res.status(200).json({ message: result });
    }
  );
};

exports.eliminarProductoDeMesa = (req, res) => {
  const mesaId = req.params.mesa_id;
  const productoId = req.params.producto_id;

  pedidoService.eliminarProductoDeMesa(mesaId, productoId, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.status(200).json({ message: result });
  });
};

exports.vaciarMesa = (req, res) => {
  const mesaId = req.params.mesa_id;

  pedidoService.vaciarMesa(mesaId, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.status(200).json({ message: result });
  });
};

exports.cambiarMesa = (req, res) => {
  const mesaActual = req.params.mesaActual;
  const nuevaMesa = req.params.nuevaMesa;

  pedidoService.cambiarMesa(mesaActual, nuevaMesa, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    res.status(200).json({ message: result });
  });
};
