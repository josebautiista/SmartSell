import { useState } from "react";
import PropTypes from "prop-types";
import RestarCantidad from "./RestarCantidad";
import styled from "styled-components";

const DivCantidad = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const InputCantidad = styled.input`
  width: 30px;
  text-align: center;
  background: white;
  outline: none;
  color: black;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export default function CantidadProducto({
  selectedTable,
  setNuevo,
  producto,
  agregarProducto,
}) {
  const [inputValue, setInputValue] = useState(producto.cantidad.toString());

  const modificarCantidad = (producto, nuevaCantidad) => {
    if (nuevaCantidad !== null) {
      setTimeout(() => {
        setNuevo((prevNuevo) =>
          prevNuevo.map((pro) =>
            pro.producto_id === producto.producto_id
              ? { ...pro, cantidad: nuevaCantidad }
              : pro
          )
        );
        console.log("Cantidad de producto restada en el carrito.");
      }, 1000);
    }
  };

  const handleInputChange = (e) => {
    const nuevaCantidad = parseInt(e.target.value, 10) || 0;
    setInputValue(e.target.value);
    setNuevo((prevAddProducto) =>
      prevAddProducto.map((pro) =>
        pro.producto_id === producto.producto_id
          ? { ...pro, cantidad: nuevaCantidad }
          : pro
      )
    );
    modificarCantidad(producto, nuevaCantidad);
  };

  return (
    <DivCantidad>
      <RestarCantidad
        setNuevo={setNuevo}
        selectedTable={selectedTable}
        producto={producto}
      />
      <InputCantidad
        type="tel"
        value={inputValue}
        onChange={handleInputChange}
      />
      <p onClick={() => agregarProducto(producto)}>+</p>
    </DivCantidad>
  );
}

CantidadProducto.propTypes = {
  selectedTable: PropTypes.number.isRequired,
  setNuevo: PropTypes.func.isRequired,
  producto: PropTypes.shape({
    producto_id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    cantidad: PropTypes.number.isRequired,
  }).isRequired,
  agregarProducto: PropTypes.func.isRequired,
};
