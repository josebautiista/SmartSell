import Login from "../src/pages/Login.jsx";
import Mesas from "./components/Mesas.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registro from "../src/pages/Registro.jsx";
import { useState } from "react";
import axios from "axios";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import Menu from "./components/Menu.jsx";
import Inventario from "./pages/Inventario.jsx";
import Ventas from "./components/ventas/Ventas.jsx";
import "./App.css";
import { localURL } from "./components/conexion.js";

function parseJwt(token) {
  if (!token) {
    return null;
  }

  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

const token = localStorage.getItem("token");
let tokenExistAndStillValid = false;

if (token) {
  tokenExistAndStillValid = parseJwt(token).exp * 1000 > Date.now();
}

const App = () => {
  const [user, setUser] = useState(null);
  async function obtenerInformacionDelUsuario() {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const response = await axios.get(`http://${localURL}:3000/user`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      const { user } = response.data;
      setUser(user);
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  }

  return (
    <>
      <Router>
        <Menu
          user={user}
          obtenerInformacionDelUsuario={obtenerInformacionDelUsuario}
        />
        <Routes>
          <Route
            path="/"
            element={
              tokenExistAndStillValid ? (
                <Mesas
                  obtenerInformacionDelUsuario={obtenerInformacionDelUsuario}
                />
              ) : (
                <Login
                  obtenerInformacionDelUsuario={obtenerInformacionDelUsuario}
                />
              )
            }
          />
          <Route
            path="/registro"
            element={
              <ProtectedRoute isAllowed={!!user && user.role == "Admin"}>
                <Registro />
              </ProtectedRoute>
            }
          />

          <Route
            path="/Mesas"
            element={
              <ProtectedRoute isAllowed={!!user && user.role == "Admin"}>
                <Mesas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Inventario"
            element={
              <ProtectedRoute isAllowed={!!user && user.role == "Admin"}>
                <Inventario />
              </ProtectedRoute>
            }
          />

          <Route
            path="/Ventas"
            element={
              <ProtectedRoute isAllowed={!!user && user.role == "Admin"}>
                <Ventas />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
