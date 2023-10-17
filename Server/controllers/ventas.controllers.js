const ventasService = require("../services/ventas.services");

exports.getVentas = (req, res) => {
  ventasService.getVentas((err, ventas) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.status(200).json(ventas);
  });
};

exports.crearVenta = (req, res) => {
  const ventaData = req.body;
  ventasService.crearVenta(ventaData, (err, message) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.status(201).json({ message: message });
  });
};

exports.getVentasPorFecha = (req, res) => {
  const { fecha } = req.query;
  ventasService.getVentasPorFecha(fecha, (err, ventas) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.status(200).json(ventas);
  });
};
