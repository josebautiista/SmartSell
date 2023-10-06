import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";

export default function Encabezado({ formatNumber, setFilteredVentas }) {
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

  const [ventas, setVentas] = useState([]);
  const [totalVentas, setTotalVentas] = useState(0);
  useEffect(() => {
    const ventasData = [
      {
        venta_id: 1,
        cliente_id: 101,
        nombre_cliente: "Cliente A",
        email_cliente: "clienteA@example.com",
        telefono_cliente: "123-456-7890",
        fecha_hora: "2023-10-01T10:00:00Z",
        nombre_medio_pago: "Tarjeta de Crédito",
        detalleVentas: [
          {
            nombre_producto: "Producto 1",
            cantidad: 2,
            precio_venta: 50,
            valor_total: 100,
          },
          {
            nombre_producto: "Producto 2",
            cantidad: 1,
            precio_venta: 30,
            valor_total: 30,
          },
        ],
        total: 130,
        cantidad_pago: 150,
      },
      {
        venta_id: 2,
        cliente_id: 102,
        nombre_cliente: "Cliente B",
        email_cliente: "clienteB@example.com",
        telefono_cliente: "987-654-3210",
        fecha_hora: "2023-10-02T15:30:00Z",
        nombre_medio_pago: "Efectivo",
        detalleVentas: [
          {
            nombre_producto: "Producto 3",
            cantidad: 3,
            precio_venta: 40,
            valor_total: 120,
          },
          {
            nombre_producto: "Producto 4",
            cantidad: 2,
            precio_venta: 25,
            valor_total: 50,
          },
        ],
        total: 170,
        cantidad_pago: 200,
      },
    ];

    const uniqueVentas = getUniqueVentas(ventasData, "venta_id");
    setVentas(uniqueVentas);
  }, []);

  const getUniqueVentas = (ventas, key) => {
    const uniqueVentasMap = new Map();
    ventas.forEach((venta) => {
      if (!uniqueVentasMap.has(venta[key])) {
        uniqueVentasMap.set(venta[key], venta);
      }
    });
    return Array.from(uniqueVentasMap.values());
  };

  const handleFilterVentas = () => {
    if (selectedDate) {
      const fecha = new Date(selectedDate).toISOString().slice(0, 10);

      const filteredVentas = ventas.filter((venta) => venta.fecha === fecha);
      setFilteredVentas(filteredVentas);

      const totalVentas = filteredVentas.reduce(
        (total, venta) => total + venta.total,
        0
      );
      setTotalVentas(totalVentas);
    } else {
      setFilteredVentas(ventas);

      const totalVentas = ventas.reduce(
        (total, venta) => total + venta.total,
        0
      );
      setTotalVentas(totalVentas);
    }
  };

  useEffect(() => {
    handleFilterVentas();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "30px",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Ventas</Typography>
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
          onClick={handleFilterVentas}
          sx={{ height: "70%" }}
        >
          Buscar
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          AlignItems: "center",
          gap: "10px",
          width: "40%",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">Total Ventas:</Typography>
        <Typography variant="h4">{formatNumber(totalVentas)}</Typography>
      </div>
    </div>
  );
}
Encabezado.propTypes = {
  formatNumber: PropTypes.func.isRequired,
  setFilteredVentas: PropTypes.func.isRequired,
};
