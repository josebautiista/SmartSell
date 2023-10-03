import PropTypes from "prop-types";

export default function RestarCantidad({ producto, setNuevo }) {
  const restarCantidad = (producto) => {
    const nuevaCantidad = producto.cantidad - 1;
    if (nuevaCantidad <= 0) {
      console.log("Producto eliminado");
      setNuevo((prevNuevo) =>
        prevNuevo.filter((pro) => pro.producto_id !== producto.producto_id)
      );
    } else {
      console.log("Cantidad de producto restada");
      setNuevo((prevNuevo) =>
        prevNuevo.map((pro) =>
          pro.producto_id === producto.producto_id
            ? { ...pro, cantidad: nuevaCantidad }
            : pro
        )
      );
    }
  };

  return <p onClick={() => restarCantidad(producto)}>-</p>;
}

RestarCantidad.propTypes = {
  producto: PropTypes.shape({
    producto_id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    cantidad: PropTypes.number.isRequired,
  }).isRequired,
  setNuevo: PropTypes.func.isRequired,
};
