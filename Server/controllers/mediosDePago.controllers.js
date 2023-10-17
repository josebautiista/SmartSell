const mediosDePagoService = require("../services/mediosDePago.services");

exports.getMediosDePago = (req, res) => {
  mediosDePagoService.getMediosDePago((err, results) => {
    if (err) {
      res.status(500).json({ error: "Error al obtener los medios de pago" });
    } else {
      res.json(results);
    }
  });
};
