import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";

export default function TablaVentas({
  setOpenModal,
  setSelectedVenta,
  filteredVentas,
  setDetalleVentas,
  formatNumber,
}) {
  console.log(filteredVentas);
  const handleOpenModal = (venta) => {
    setSelectedVenta({
      venta_id: 1,
      cliente_id: 101,
      nombre_cliente: "Cliente A",
      email_cliente: "clienteA@example.com",
      telefono_cliente: "123-456-7890",
      fecha_hora: "2023-10-01T10:00:00Z",
      nombre_medio_pago: "Tarjeta de Crédito",
      total: 130,
      cantidad_pago: 150,
    });
    setOpenModal(true);

    setDetalleVentas([
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
    ]);
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              ID Venta
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              Nombre Cliente
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              Fecha y Hora
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredVentas.map((venta, i) => (
            <TableRow
              key={i}
              sx={{ cursor: "pointer" }}
              onClick={() => handleOpenModal(venta)}
            >
              <TableCell>{venta.venta_id}</TableCell>
              <TableCell>{venta.nombreCliente}</TableCell>
              <TableCell>{venta.fecha}</TableCell>
              <TableCell>{formatNumber(venta.total)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
TablaVentas.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  setSelectedVenta: PropTypes.func.isRequired,
  filteredVentas: PropTypes.array.isRequired,
  setDetalleVentas: PropTypes.func.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  formatNumber: PropTypes.func.isRequired,
};
