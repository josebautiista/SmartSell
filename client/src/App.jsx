import Login from "../src/pages/Login.jsx";
import Mesas from "../src/pages/Mesas.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Registro from "../src/pages/Registro.jsx";
import { useState } from "react";
import axios from "axios";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";

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
console.log(token);

let tokenExistAndStillValid = false;

if (token) {
  tokenExistAndStillValid = parseJwt(token).exp * 1000 > Date.now();
}

const App = () => {
  const [user, setUser] = useState(null);

  async function obtenerInformacionDelUsuario() {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/user/", {
        headers: {
          Authorization: `${token}`,
        },
      });

      const { user } = response.data;
      setUser(user);
      console.log(user.role == "Admin");
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  }

  return (
    <>
      <Router>
        <li>
          <Link to="/Registro">Dashboard</Link>
        </li>
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
        </Routes>
      </Router>
    </>
  );
};

export default App;
