const mesasService = require("../services/mesas.services");

exports.getMesas = (req, res) => {
  mesasService.getMesas((err, result) => {
    if (err) {
      res.status(500).json({ error: "Error al obtener las mesas" });
    } else {
      res.json(result);
    }
  });
};

exports.crearMesa = (req, res) => {
  const { capacidad, estado } = req.body;
  mesasService.crearMesa(capacidad, estado, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error al crear la nueva mesa" });
    } else {
      res.json(result);
    }
  });
};
