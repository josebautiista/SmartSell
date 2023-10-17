const express = require("express");
const CategoriasController = require("../controllers/categorias.controllers");
const router = express.Router();
const categoriasController = new CategoriasController();

router.get("/", (req, res) => {
  categoriasController.getCategorias(req, res);
});

module.exports = router;
