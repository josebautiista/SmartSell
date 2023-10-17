const CategoriasRepository = require("../repositories/categorias.repositories");

class CategoriasService {
  constructor() {
    this.categoriasRepository = new CategoriasRepository();
  }

  getCategorias(callback) {
    this.categoriasRepository.getCategorias((error, results) => {
      if (error) {
        return callback(error, null);
      }
      callback(null, results);
    });
  }
}

module.exports = CategoriasService;
