import { Paper } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Encabezado from "./Encabezado";
import Izquierdo from "./Izquierdo";
import Derecho from "./Derecho";
import { localURL } from "../conexion";

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

const Categorias = styled(Paper)`
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

  useEffect(() => {
    axios
      .get(`http://${localURL}:3000/categorias`)
      .then(({ data }) => {
        setCategorias(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleClick = (id) => {
    setCategoriaSeleccionada(id);
  };

  const obtenerProductosPedido = useCallback(() => {
    axios
      .get(`http://${localURL}:3000/pedido/${selectedTable}`)
      .then(({ data }) => {
        const productos = data.filter(({ cantidad }) => cantidad > 0);
        setNuevo(productos);
      })
      .catch((error) => {
        console.error("Error al obtener productos de la mesa:", error);
      });
  }, [selectedTable]);

  useEffect(() => {
    obtenerProductosPedido();
  }, [obtenerProductosPedido]);

  const agregarProducto = (producto) => {
    axios
      .get(
        `http://${localURL}:3000/pedido/existe/${selectedTable}/${producto.producto_id}`
      )
      .then(({ data }) => {
        const productoEnCarrito = data;

        if (productoEnCarrito) {
          const nuevaCantidad = productoEnCarrito.cantidad + 1;
          axios
            .put(
              `http://${localURL}:3000/pedido/${selectedTable}/${producto.producto_id}/actualizar_cantidad`,
              {
                ...productoEnCarrito,
                cantidad: nuevaCantidad,
              }
            )
            .then(() => {
              setNuevo((prevNuevo) =>
                prevNuevo.map((producto) =>
                  producto.producto_id === productoEnCarrito.producto_id
                    ? { ...producto, cantidad: nuevaCantidad }
                    : producto
                )
              );
            })
            .catch((error) => {
              console.error(
                "Error al aumentar la cantidad del producto en la mesa:",
                error
              );
            });
        } else {
          axios
            .post(`http://${localURL}:3000/pedido`, {
              ...producto,
              mesa_id: selectedTable,
              cantidad: 1,
            })
            .then(() => {
              setNuevo((prevNuevo) => [
                ...prevNuevo,
                { ...producto, cantidad: 1 },
              ]);
            })
            .catch((error) => {
              console.error("Error al agregar el producto a la mesa:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error al obtener el producto en la mesa:", error);
      });
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
          {categorias.map((cat, i) => (
            <Categorias key={i} onClick={() => handleClick(cat.categoria_id)}>
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
