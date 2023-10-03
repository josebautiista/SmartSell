import PropTypes from "prop-types";
import { styled } from "styled-components";

const InputPrecio = styled.input`
  width: 15%;
  text-align: center;
  background: white;
  outline: none;
  color: black;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export default function PrecioProducto({ selectedTable, setNuevo, producto }) {
  const modificarPrecio = (producto, precio) => {
    const nuevoPrecio = precio;
    if (nuevoPrecio !== null) {
      console.log("Precio del producto actualizado");
    }
  };

  return (
    <InputPrecio
      type="tel"
      value={producto.precio_venta !== undefined ? producto.precio_venta : ""}
      onChange={(e) => {
        const nuevoPrecio = parseInt(e.target.value);
        setNuevo((prevAddProducto) =>
          prevAddProducto.map((prod) =>
            prod.producto_id === producto.producto_id
              ? {
                  ...prod,
                  precio_venta: isNaN(nuevoPrecio) ? undefined : nuevoPrecio,
                }
              : prod
          )
        );
        modificarPrecio(producto, nuevoPrecio);
      }}
    />
  );
}

PrecioProducto.propTypes = {
  setNuevo: PropTypes.func.isRequired,
  producto: PropTypes.shape({
    producto_id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    precio_venta: PropTypes.number,
  }).isRequired,
  selectedTable: PropTypes.number.isRequired,
};
