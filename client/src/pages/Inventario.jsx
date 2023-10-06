import { useEffect, useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import { FaArrowDownWideShort } from "react-icons/fa6";
import TextField from "@mui/material/TextField";

export default function Inventario() {
  const [productos, setProductos] = useState([]);
  const [orderBy, setOrderBy] = useState("");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    const utcOffset = -5;
    const colombiaTime = new Date(now.getTime() + utcOffset * 60 * 60 * 1000);

    const year = colombiaTime.getUTCFullYear();
    const month = colombiaTime.getUTCMonth() + 1;
    const day = colombiaTime.getUTCDate();

    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  });

  useEffect(() => {
    setProductos([
      {
        detalle_id: 1,
        inventario_id: 101,
        fecha: "2023-10-05",
        ingrediente_id: 201,
        nombre_ingrediente: "Producto 1",
        cantidad_detalle: 5,
        cantidad_ingrediente: 100,
        unidad_medida: "unidades",
        precio_compra: 10.0,
      },
      {
        detalle_id: 2,
        inventario_id: 102,
        fecha: "2023-10-06",
        ingrediente_id: 202,
        nombre_ingrediente: "Producto 2",
        cantidad_detalle: 3,
        cantidad_ingrediente: 50,
        unidad_medida: "unidades",
        precio_compra: 8.0,
      },
      {
        detalle_id: 3,
        inventario_id: 103,
        fecha: "2023-10-07",
        ingrediente_id: 203,
        nombre_ingrediente: "Producto 3",
        cantidad_detalle: 2,
        cantidad_ingrediente: 30,
        unidad_medida: "unidades",
        precio_compra: 5.5,
      },
      {
        detalle_id: 4,
        inventario_id: 104,
        fecha: "2023-10-08",
        ingrediente_id: 204,
        nombre_ingrediente: "Producto 4",
        cantidad_detalle: 4,
        cantidad_ingrediente: 80,
        unidad_medida: "unidades",
        precio_compra: 12.0,
      },
      {
        detalle_id: 5,
        inventario_id: 105,
        fecha: "2023-10-09",
        ingrediente_id: 205,
        nombre_ingrediente: "Producto 5",
        cantidad_detalle: 6,
        cantidad_ingrediente: 120,
        unidad_medida: "unidades",
        precio_compra: 15.0,
      },
      {
        detalle_id: 6,
        inventario_id: 106,
        fecha: "2023-10-10",
        ingrediente_id: 206,
        nombre_ingrediente: "Producto 6",
        cantidad_detalle: 2,
        cantidad_ingrediente: 40,
        unidad_medida: "unidades",
        precio_compra: 7.5,
      },
      {
        detalle_id: 7,
        inventario_id: 107,
        fecha: "2023-10-11",
        ingrediente_id: 207,
        nombre_ingrediente: "Producto 7",
        cantidad_detalle: 3,
        cantidad_ingrediente: 60,
        unidad_medida: "unidades",
        precio_compra: 9.0,
      },
      {
        detalle_id: 8,
        inventario_id: 108,
        fecha: "2023-10-12",
        ingrediente_id: 208,
        nombre_ingrediente: "Producto 8",
        cantidad_detalle: 4,
        cantidad_ingrediente: 80,
        unidad_medida: "unidades",
        precio_compra: 11.0,
      },
      {
        detalle_id: 9,
        inventario_id: 109,
        fecha: "2023-10-13",
        ingrediente_id: 209,
        nombre_ingrediente: "Producto 9",
        cantidad_detalle: 7,
        cantidad_ingrediente: 140,
        unidad_medida: "unidades",
        precio_compra: 18.0,
      },
      {
        detalle_id: 10,
        inventario_id: 110,
        fecha: "2023-10-14",
        ingrediente_id: 210,
        nombre_ingrediente: "Producto 10",
        cantidad_detalle: 1,
        cantidad_ingrediente: 20,
        unidad_medida: "unidades",
        precio_compra: 4.0,
      },
      {
        detalle_id: 11,
        inventario_id: 111,
        fecha: "2023-10-15",
        ingrediente_id: 211,
        nombre_ingrediente: "Producto 11",
        cantidad_detalle: 8,
        cantidad_ingrediente: 160,
        unidad_medida: "unidades",
        precio_compra: 20.0,
      },
      {
        detalle_id: 12,
        inventario_id: 112,
        fecha: "2023-10-16",
        ingrediente_id: 212,
        nombre_ingrediente: "Producto 12",
        cantidad_detalle: 2,
        cantidad_ingrediente: 40,
        unidad_medida: "unidades",
        precio_compra: 8.5,
      },
      {
        detalle_id: 13,
        inventario_id: 113,
        fecha: "2023-10-17",
        ingrediente_id: 213,
        nombre_ingrediente: "Producto 13",
        cantidad_detalle: 6,
        cantidad_ingrediente: 120,
        unidad_medida: "unidades",
        precio_compra: 15.0,
      },
      {
        detalle_id: 14,
        inventario_id: 114,
        fecha: "2023-10-18",
        ingrediente_id: 214,
        nombre_ingrediente: "Producto 14",
        cantidad_detalle: 4,
        cantidad_ingrediente: 80,
        unidad_medida: "unidades",
        precio_compra: 10.0,
      },
      {
        detalle_id: 15,
        inventario_id: 115,
        fecha: "2023-10-19",
        ingrediente_id: 215,
        nombre_ingrediente: "Producto 15",
        cantidad_detalle: 3,
        cantidad_ingrediente: 60,
        unidad_medida: "unidades",
        precio_compra: 7.0,
      },
      {
        detalle_id: 16,
        inventario_id: 116,
        fecha: "2023-10-20",
        ingrediente_id: 216,
        nombre_ingrediente: "Producto 16",
        cantidad_detalle: 5,
        cantidad_ingrediente: 100,
        unidad_medida: "unidades",
        precio_compra: 12.5,
      },
      {
        detalle_id: 17,
        inventario_id: 117,
        fecha: "2023-10-21",
        ingrediente_id: 217,
        nombre_ingrediente: "Producto 17",
        cantidad_detalle: 2,
        cantidad_ingrediente: 40,
        unidad_medida: "unidades",
        precio_compra: 6.0,
      },
      {
        detalle_id: 18,
        inventario_id: 118,
        fecha: "2023-10-22",
        ingrediente_id: 218,
        nombre_ingrediente: "Producto 18",
        cantidad_detalle: 4,
        cantidad_ingrediente: 80,
        unidad_medida: "unidades",
        precio_compra: 9.0,
      },
      {
        detalle_id: 19,
        inventario_id: 119,
        fecha: "2023-10-23",
        ingrediente_id: 219,
        nombre_ingrediente: "Producto 19",
        cantidad_detalle: 3,
        cantidad_ingrediente: 60,
        unidad_medida: "unidades",
        precio_compra: 7.5,
      },
      {
        detalle_id: 20,
        inventario_id: 120,
        fecha: "2023-10-24",
        ingrediente_id: 220,
        nombre_ingrediente: "Producto 20",
        cantidad_detalle: 6,
        cantidad_ingrediente: 120,
        unidad_medida: "unidades",
        precio_compra: 11.0,
      },
    ]);
  }, []);

  const sortedProductos = productos.slice().sort((a, b) => {
    if (orderBy === "nombre_ingrediente") {
      return orderDirection === "asc"
        ? a.nombre_ingrediente.localeCompare(b.nombre_ingrediente)
        : b.nombre_ingrediente.localeCompare(a.nombre_ingrediente);
    } else if (orderBy === "precio_compra") {
      return orderDirection === "asc"
        ? a.precio_compra - b.precio_compra
        : b.precio_compra - a.precio_compra;
    }
    return 0;
  });

  const handleSort = (column) => {
    if (column === orderBy) {
      setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(column);
      setOrderDirection("asc");
    }
  };

  return (
    <div
      style={{
        boxSizing: "border-box",
        padding: "10px 30px 30px 30px",
        textAlign: "center",
        marginTop: "80px",
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
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            boxSizing: "border-box",
            padding: "10px",
            background: "white",
            borderRadius: "5px",
          }}
        >
          {/* Campo de entrada tipo fecha */}
          <TextField
            label="Filtrar por fecha"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{
              style: { color: "black" },
            }}
            InputProps={{ style: { colorScheme: "none" } }}
          />

          {/* Botón para realizar la búsqueda */}
          <Button
            color="primary"
            size="medium"
            variant="contained"
            onClick={() => alert("filtrar")}
            sx={{ height: "70%" }}
          >
            Buscar
          </Button>
        </div>
        <Button
          color="info"
          variant="contained"
          size="small"
          onClick={() => alert("crear inventario")}
          style={{ height: "50px" }}
        >
          Crear Inventario
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleSort("inventario_id")}
              >
                <p>Inventario ID</p> <FaArrowDownWideShort />
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleSort("fecha")}
              >
                <p>Fecha</p> <FaArrowDownWideShort />
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleSort("ingrediente_id")}
              >
                <p>ID Ingrediente</p> <FaArrowDownWideShort />
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleSort("nombre_ingrediente")}
              >
                <p>Nombre Ingrediente</p> <FaArrowDownWideShort />
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleSort("cantidad_detalle")}
              >
                <p>Cantidad Inicial</p> <FaArrowDownWideShort />
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleSort("cantidad_ingrediente")}
              >
                <p>Cantidad Actual</p> <FaArrowDownWideShort />
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleSort("unidad_medida")}
              >
                <p>Unidad Medida</p> <FaArrowDownWideShort />
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => handleSort("precio_compra")}
              >
                <p>Precio Compra</p> <FaArrowDownWideShort />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedProductos.map((producto) => (
              <TableRow key={producto.detalle_id}>
                <TableCell style={{ textAlign: "center" }}>
                  {producto.inventario_id}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {new Date(producto.fecha).toLocaleDateString()}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {producto.ingrediente_id}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {producto.nombre_ingrediente}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {producto.cantidad_detalle}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {producto.cantidad_ingrediente}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {producto.unidad_medida}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {producto.precio_compra}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
