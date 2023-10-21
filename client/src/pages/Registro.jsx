import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { localURL } from "../components/conexion";

const Registro = () => {
  const [roles, setRoles] = useState([]);
  const [rol, setRol] = useState("");
  const [data, setData] = useState({
    nombre: "",
    username: "",
    password: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { nombre, username, password } = data;
    const allFieldsFilled = nombre !== "" && username !== "" && password !== "";
    const isRoleSelected = rol !== "";
    setIsFormValid(allFieldsFilled && isRoleSelected);
  }, [data, rol]);

  const handleSnackbarOpen = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  useEffect(() => {
    axios
      .get(`http://${localURL}:3000/roles/`)
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener roles: ", error);
      });
  }, []);

  const handleRolChange = (event) => {
    setRol(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const resetForm = () => {
    setData({
      nombre: "",
      username: "",
      password: "",
    });
    setRol("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const dataToSend = {
      ...data,
      role_id: rol,
    };

    axios
      .post(`http://${localURL}:3000/user/register`, dataToSend)
      .then((response) => {
        resetForm();
        handleSnackbarOpen("Usuario registrado exitosamente", "success");
      })
      .catch((error) => {
        handleSnackbarOpen(
          JSON.parse(error.request.responseText).message,
          "error"
        );
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbarSeverity}
          onClose={() => setOpenSnackbar(false)}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      <Paper elevation={3} style={{ padding: "20px", maxWidth: "400px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="../../src/assets/logo.svg"
            alt="logo"
            style={{ width: "15%" }}
          />
          <Typography variant="h5" style={{ marginBottom: "16px" }}>
            Registro
          </Typography>
        </div>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                variant="outlined"
                required
                fullWidth
                name="nombre"
                value={data.nombre}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="username"
                required
                variant="outlined"
                fullWidth
                name="username"
                value={data.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                required
                type="password"
                variant="outlined"
                fullWidth
                name="password"
                value={data.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="rol">Rol</InputLabel>
                <Select
                  required
                  label="Rol"
                  id="rol"
                  value={rol}
                  onChange={handleRolChange}
                  fullWidth
                >
                  {roles.map((role) => (
                    <MenuItem value={role.role_id} key={role.role_id}>
                      {role.role_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "16px" }}
            disabled={!isFormValid}
          >
            Registrarse
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default Registro;
