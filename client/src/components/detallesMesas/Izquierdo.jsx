import { Button, Paper } from "@mui/material";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
import DetallesVenta from "./DetallesVenta";
import TotalPagar from "./TotalPagar";
import RegistrarVenta from "./RegistrarVenta";
import ResponsiveCatProd from "./ResponsiveCatProd";

const DivIzquierdo = styled.div`
  width: 40%;
  height: 100%;
  background-color: transparent;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  user-select: none;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 100%;
  }
`;

const PaperDiv = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: auto;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export default function Izquierdo({
  agregarProducto,
  addProductos,
  selectedTable,
  setAddProductos,
  formatNumber,
  categorias,
  handleClick,
  categoriaSeleccionada,
}) {
  const [montoPagado, setMontoPagado] = useState("");
  const [agregando, setAgregando] = useState(false);

  const handleAgregando = () => {
    setAgregando(!agregando);
  };

  const total = addProductos
    .map(
      ({ precio_venta, precio_unitario, cantidad }) =>
        (precio_venta !== undefined ? precio_venta : precio_unitario) * cantidad
    )
    .reduce((total, valor) => total + valor, 0);

  const isMobile = window.innerWidth < 768;

  return (
    <DivIzquierdo>
      {agregando ? (
        <ResponsiveCatProd
          agregando={agregando}
          categorias={categorias}
          handleClick={handleClick}
          formatNumber={formatNumber}
          agregarProducto={agregarProducto}
          categoriaSeleccionada={categoriaSeleccionada}
          setAgregando={setAgregando}
        />
      ) : (
        <>
          <DetallesVenta
            addProductos={addProductos}
            selectedTable={selectedTable}
            setAddProductos={setAddProductos}
            agregarProducto={agregarProducto}
            formatNumber={formatNumber}
          ></DetallesVenta>

          <PaperDiv>
            <TotalPagar
              montoPagado={montoPagado}
              formatNumber={formatNumber}
              total={total}
            ></TotalPagar>

            <RegistrarVenta
              montoPagado={montoPagado}
              addProductos={addProductos}
              selectedTable={selectedTable}
              setAddProductos={setAddProductos}
              setMontoPagado={setMontoPagado}
              total={total}
              formatNumber={formatNumber}
            ></RegistrarVenta>
          </PaperDiv>

          {isMobile && (
            <Button
              color="success"
              variant="contained"
              sx={{
                display: "flex",
              }}
              onClick={handleAgregando}
            >
              Agregar Productos
            </Button>
          )}
        </>
      )}
    </DivIzquierdo>
  );
}

Izquierdo.propTypes = {
  agregarProducto: PropTypes.func.isRequired,
  addProductos: PropTypes.arrayOf(
    PropTypes.shape({
      producto_id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      cantidad: PropTypes.number.isRequired,
      precio_venta: PropTypes.number,
    })
  ).isRequired,
  selectedTable: PropTypes.number.isRequired,
  setAddProductos: PropTypes.func.isRequired,
  formatNumber: PropTypes.func.isRequired,
  categorias: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  categoriaSeleccionada: PropTypes.number,
};
