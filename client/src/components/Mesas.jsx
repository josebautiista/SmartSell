import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Mesa from "./Mesa";
import { styled } from "styled-components";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

const StyledBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 100px;
  color: "white";

  & > :not(style) {
    width: 250px;
    height: 250px;
    margin: 5px;
  }
`;

const PaperMesa = styled(Paper)`
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function Mesas() {
  const [mesas, setMesas] = useState([]);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const añadirMesa = () => {
    setDialogOpen(true);
  };
  const mesasAPI = [
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

  const confirmarAñadirMesa = () => {
    const nuevaMesa = {
      mesa_id: mesas.length + 1,
      capacidad: 4,
      estado: "Disponible",
    };

    setMesas([...mesas, nuevaMesa]);

    console.log("Mesa agregada correctamente");
    handleCloseDialog();
  };

  useEffect(() => {
    setMesas(mesasAPI);
  }, []);

  return (
    <StyledBox>
      {mesas.map((mesa, index) => (
        <PaperMesa
          elevation={3}
          key={index}
          sx={{
            backgroundColor:
              mesa.estado === "Disponible" ? "#4a6f20" : "#7b1104",
          }}
          onClick={handleOpen}
        >
          <Typography variant="h5" sx={{ color: "black" }}>
            Mesa {mesa.mesa_id}
          </Typography>
          <Mesa open={open} setOpen={setOpen} id={mesa.mesa_id} />
        </PaperMesa>
      ))}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
          >
            ¿Estás seguro de que deseas añadir una nueva mesa?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button onClick={handleCloseDialog} color="error" variant="contained">
            Cancelar
          </Button>
          <Button
            onClick={confirmarAñadirMesa}
            color="success"
            variant="contained"
            autoFocus
          >
            Añadir
          </Button>
        </DialogActions>
      </Dialog>

      <PaperMesa
        style={{
          justifyContent: "center",
          alignItems: "center",
          background: "#4a6f20",
        }}
      >
        <p onClick={añadirMesa}>+</p>
      </PaperMesa>
    </StyledBox>
  );
}
