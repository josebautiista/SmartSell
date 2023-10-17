const productosCategoria = require("../services/productos.services");

exports.getProductosPorCategoria = (req, res) => {
  const categoriaId = req.query.id;

  productosCategoria.getProductosPorCategoria(
    categoriaId,
    (err, resultados) => {
      if (err) {
        console.error("Error al obtener productos por categoría:", err);
        return res
          .status(500)
          .json({ error: "Error al obtener productos por categoría" });
      }

      res.status(200).json(resultados);
    }
  );
};
