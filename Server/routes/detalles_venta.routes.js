const express = require("express");
const router = express.Router();
const detallesVentaController = require("../controllers/detalles_venta.controllers");

router.get("/", detallesVentaController.getDetallesVenta);

module.exports = router;
