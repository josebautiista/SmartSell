import PropTypes from "prop-types";
import styled from "styled-components";
import Encabezado from "./Encabezado";
import Izquierdo from "./Izquierdo";
import Derecho from "./Derecho";
import { useState, useEffect } from "react";

const DivContenedor = styled.div`
  display: flex;
  gap: 10px;
  height: 80vh;

  @media (max-width: 768px) {
    flex-direction: row;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
  }
`;

const DivCentro = styled.div`
  width: 20%;
  height: 100%;
  background: #242424;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  user-select: none;
  @media (max-width: 768px) {
    display: none;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
  }
`;

const Categorias = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-grow: 1;
  font-weight: bold;
`;

export const Detalles = ({ idMesa }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [nuevo, setNuevo] = useState([]);
  const [selectedTable, setSelectedTable] = useState(idMesa);

  const categoriasEstaticas = [
    {
      categoria_id: 1,
      nombre: "Categoria 1",
    },
    {
      categoria_id: 2,
      nombre: "Categoria 2",
    },
    {
      categoria_id: 3,
      nombre: "Categoria 3",
    },
  ];

  useEffect(() => {
    setCategorias(categoriasEstaticas);
  }, []);

  const handleClick = (id) => {
    setCategoriaSeleccionada(id);
  };

  const productosAPI = [
    {
      producto_id: 1,
      nombre: "Producto 1",
      precio_unitario: 10.99,
    },
    {
      producto_id: 2,
      nombre: "Producto 2",
      precio_unitario: 15.49,
    },
    {
      producto_id: 3,
      nombre: "Producto 3",
      precio_unitario: 8.99,
    },
  ];

  const agregarProducto = (producto) => {
    setNuevo((prevNuevo) => [...prevNuevo, { ...producto, cantidad: 1 }]);
  };

  const formatNumber = (number) => {
    const optionsCOP = {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    };
    return number.toLocaleString("es-CO", optionsCOP);
  };

  return (
    <>
      <Encabezado
        setSelectedTable={setSelectedTable}
        selectedTable={selectedTable}
        nuevo={nuevo}
      ></Encabezado>

      <DivContenedor>
        <Izquierdo
          agregarProducto={agregarProducto}
          setNuevo={setNuevo}
          nuevo={nuevo}
          selectedTable={selectedTable}
          formatNumber={formatNumber}
          categorias={categorias}
          handleClick={handleClick}
          categoriaSeleccionada={categoriaSeleccionada}
        ></Izquierdo>

        <DivCentro>
          {categorias.map((cat) => (
            <Categorias
              key={cat.categoria_id}
              onClick={() => handleClick(cat.categoria_id)}
            >
              {cat.nombre}
            </Categorias>
          ))}
        </DivCentro>

        <Derecho
          formatNumber={formatNumber}
          agregarProducto={agregarProducto}
          categoriaSeleccionada={categoriaSeleccionada}
        ></Derecho>
      </DivContenedor>
    </>
  );
};

Detalles.propTypes = {
  idMesa: PropTypes.number.isRequired,
};

export default Detalles;
