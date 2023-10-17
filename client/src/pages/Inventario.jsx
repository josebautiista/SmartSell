import { useEffect, useState } from "react";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { MdImportExport } from "react-icons/md";
import { localURL } from "../components/conexion";

localURL;

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [orderBy, setOrderBy] = useState("");
  const [orderDirection, setOrderDirection] = useState("desc");

  useEffect(() => {
    axios
      .get(`http://${localURL}:3000/inventario`)
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de productos:", error);
      });
  }, []);

  const sortedProductos = productos.slice().sort((a, b) => {
    if (orderBy === "nombre") {
      return orderDirection === "asc"
        ? a.nombre.localeCompare(b.nombre)
        : b.nombre.localeCompare(a.nombre);
    }
    return 0;
  });

  const handleSort = (column) => {
    if (column === orderBy) {
      setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(column);
      setOrderDirection("desc");
    }

    const sorted = productos.slice().sort((a, b) => {
      if (column === "nombre") {
        return orderDirection === "asc"
          ? a.nombre.localeCompare(b.nombre)
          : b.nombre.localeCompare(a.nombre);
      }
      if (column === "cantidad_disponible") {
        return orderDirection === "asc"
          ? a.cantidad_disponible - b.cantidad_disponible
          : b.cantidad_disponible - a.cantidad_disponible;
      }
      if (column === "producto_id") {
        return orderDirection === "asc"
          ? a.producto_id - b.producto_id
          : b.producto_id - a.producto_id;
      }
      return 0;
    });

    setProductos(sorted);
  };

  return (
    <div
      style={{
        boxSizing: "border-box",
        padding: "10px 30px 30px 30px",
        textAlign: "center",
        marginTop: "80px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Typography variant="h4" sx={{ margin: "20px" }}>
          Inventario
        </Typography>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  cursor: "pointer",
                  fontSize: "1.3rem",
                }}
                onClick={() => handleSort("producto_id")}
              >
                <p>ID producto</p> <MdImportExport color="green" size="2rem" />
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  cursor: "pointer",
                  fontSize: "1.3rem",
                }}
                onClick={() => handleSort("nombre")}
              >
                <p>Nombre</p> <MdImportExport color="green" size="2rem" />
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  cursor: "pointer",
                  fontSize: "1.3rem",
                }}
                onClick={() => handleSort("cantidad_disponible")}
              >
                <p>Cantidad Actual</p>{" "}
                <MdImportExport color="green" size="2rem" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProductos.map((producto) => (
              <TableRow key={producto.detalle_id}>
                <TableCell style={{ textAlign: "center" }}>
                  {producto.producto_id}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {producto.nombre}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {producto.cantidad_disponible}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
