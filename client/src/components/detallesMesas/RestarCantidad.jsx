import { IoIosRemove } from "react-icons/io";
import axios from "axios";
import PropTypes from "prop-types";
import { localURL } from "../conexion";

export default function RestarCantidad({ producto, setNuevo, selectedTable }) {
  const eliminarProductoCarrito = (productoId) => {
    axios
      .delete(
        `http://${localURL}:3000/pedido/existe/${selectedTable}/${productoId}`
      )
      .then(() => {
        setNuevo((prevNuevo) =>
          prevNuevo.filter((producto) => producto.producto_id !== productoId)
        );
      })
      .catch((error) => {
        console.error("Error al eliminar el producto de la mesa:", error);
      });
  };
  const restarCantidad = (producto) => {
    const nuevaCantidad = producto.cantidad - 1;
    if (nuevaCantidad <= 0) {
      eliminarProductoCarrito(producto.producto_id);
    } else {
      axios
        .put(
          `http://${localURL}:3000/pedido/${selectedTable}/${producto.producto_id}/actualizar_cantidad`,
          {
            cantidad: nuevaCantidad,
          }
        )
        .then(() => {
          setNuevo((prevNuevo) =>
            prevNuevo.map((pro) =>
              pro.producto_id === producto.producto_id
                ? { ...pro, cantidad: nuevaCantidad }
                : pro
            )
          );
        })
        .catch((error) => {
          console.error(
            "Error al restar la cantidad del producto en la mesa:",
            error
          );
        });
    }
  };
  return (
    <IoIosRemove
      color="red"
      cursor={"pointer"}
      size={"1.5rem"}
      onClick={() => restarCantidad(producto)}
    />
  );
}
RestarCantidad.propTypes = {
  producto: PropTypes.shape({
    producto_id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    cantidad: PropTypes.number.isRequired,
  }).isRequired,
  setNuevo: PropTypes.func.isRequired,
  selectedTable: PropTypes.number.isRequired,
};
