import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

const tableOptionsAPI = [
  { mesa_id: 1, estado: "Disponible" },
  { mesa_id: 2, estado: "No Disponible" },
  { mesa_id: 3, estado: "Disponible" },
  { mesa_id: 4, estado: "No Disponible" },
  { mesa_id: 5, estado: "Disponible" },
  { mesa_id: 6, estado: "No Disponible" },
  { mesa_id: 7, estado: "Disponible" },
  { mesa_id: 8, estado: "No Disponible" },
  { mesa_id: 9, estado: "Disponible" },
  { mesa_id: 10, estado: "No Disponible" },
];

const CambiarMesa = ({ setOpen, open, selectedTable, setSelectedTable }) => {
  const [newTable, setNewTable] = useState("");

  const handleConfirm = () => {
    if (newTable) {
      setSelectedTable(newTable);
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Cambiar mesa</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Seleccione a qué mesa desea cambiar:
        </DialogContentText>
        <FormControl fullWidth>
          <Select
            labelId="newTable-label"
            id="newTable"
            value={newTable}
            onChange={(e) => setNewTable(e.target.value)}
            autoFocus
          >
            {tableOptionsAPI
              .filter((table) => table.estado === "Disponible")
              .map((table) => (
                <MenuItem key={table.mesa_id} value={table.mesa_id}>
                  Mesa {table.mesa_id}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="contained">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="success" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CambiarMesa.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedTable: PropTypes.number.isRequired,
  setSelectedTable: PropTypes.func.isRequired,
};

export default CambiarMesa;
