import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";

const DivDerecho = styled.div`
  width: 40%;
  height: 100%;
  background: #242424;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  user-select: none;
  @media (max-width: 768px) {
    display: none;
    width: 100%;
    justify-content: center;
  }
`;

const ProductosAdd = styled(Paper)`
  width: 126px;
  height: 126px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export default function Derecho({
  formatNumber,
  agregarProducto,
  categoriaSeleccionada,
}) {
  const [productos, setProductos] = useState([]);

  const productosAPI = [
    {
      nombre: "Producto 1",
      precio_unitario: 10.99,
    },
    {
      nombre: "Producto 2",
      precio_unitario: 15.49,
    },
    {
      nombre: "Producto 3",
      precio_unitario: 8.99,
    },
  ];

  useEffect(() => {
    if (categoriaSeleccionada) {
      const productosCategoria = productosAPI.map((producto) => ({
        ...producto,
        precio_venta: producto.precio_unitario,
      }));

      setProductos(productosCategoria);
    }
  }, [categoriaSeleccionada]);

  return (
    <DivDerecho className="productos">
      {productos.map((producto, i) => (
        <ProductosAdd key={i} onClick={() => agregarProducto(producto)}>
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            {producto.nombre}
          </p>
          <span>{formatNumber(producto.precio_unitario)}</span>
        </ProductosAdd>
      ))}
    </DivDerecho>
  );
}

Derecho.propTypes = {
  formatNumber: PropTypes.func.isRequired,
  agregarProducto: PropTypes.func.isRequired,
  categoriaSeleccionada: PropTypes.any,
};
