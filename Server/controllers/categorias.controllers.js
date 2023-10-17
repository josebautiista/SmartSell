const CategoriasService = require("../services/categorias.services");

class CategoriasController {
  constructor() {
    this.categoriasService = new CategoriasService();
  }

  getCategorias(req, res) {
    this.categoriasService.getCategorias((error, results) => {
      if (error) {
        console.error("Error al obtener categorías:", error);
        return res.status(500).send("Error al obtener categorías.");
      }
      res.json(results);
    });
  }
}

module.exports = CategoriasController;
