const detallesVentaService = require("../services/detalles_venta.services");

exports.getDetallesVenta = (req, res) => {
  const ventaId = req.query.venta_id;

  detallesVentaService.getDetallesVenta(ventaId, (error, results) => {
    if (error) {
      res
        .status(500)
        .json({ error: "Error al obtener los detalles de la venta" });
    } else {
      res.status(200).json(results);
    }
  });
};
