const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/user", require("./routes/user.routes"));
app.use("/roles", require("./routes/roles.routes"));
app.use("/pedido", require("./routes/pedido.routes"));
app.use("/mesas", require("./routes/mesas.routes"));
app.use("/categorias", require("./routes/categorias.routes"));
app.use("/productos", require("./routes/productos.routes"));
app.use("/ventas", require("./routes/ventas.routes"));
app.use("/detalles_venta", require("./routes/detalles_venta.routes"));
app.use("/inventario", require("./routes/inventario.routes"));
app.use("/medios_de_pago", require("./routes/mediosPago.routes"));

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
