const inventarioService = require("../services/inventario.services");

exports.getInventario = (req, res) => {
  inventarioService.getInventario((err, result) => {
    if (err) {
      res.status(500).json({ error: "Error al obtener los productos" });
    } else {
      res.status(200).json(result);
    }
  });
};
