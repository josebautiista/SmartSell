const express = require("express");
const pedidoController = require("../controllers/pedido.controllers");
const router = express.Router();
router.put(
  "/:mesa_id/:producto_id/actualizar_cantidad",
  pedidoController.actualizarCantidad
);

router.put(
  "/:mesa_id/:producto_id/actualizar_precio",
  pedidoController.actualizarPrecio
);

router.get("/existe/:mesa_id/:producto_id", pedidoController.getProductoExiste);

router.get("/:mesa_id", pedidoController.getProductosEnMesa);

router.post("/", pedidoController.agregarProductoEnMesa);

router.delete(
  "/existe/:mesa_id/:producto_id",
  pedidoController.eliminarProductoDeMesa
);

router.delete("/:mesa_id", pedidoController.vaciarMesa);

router.put(
  "/cambiar_mesa/:mesaActual/:nuevaMesa",
  pedidoController.cambiarMesa
);

module.exports = router;
