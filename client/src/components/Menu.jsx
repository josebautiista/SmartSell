/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import {
  BiTable,
  BiDollarCircle,
  BiArchive,
  BiLogOut,
  BiUserPlus,
} from "react-icons/bi";

export default function Menu({ user, obtenerInformacionDelUsuario }) {
  useEffect(() => {
    obtenerInformacionDelUsuario();
  }, []);

  const navigate = useNavigate();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[
          { text: "Mesas", icon: <BiTable color="darkblue" size={"1.2rem"} /> },
          {
            text: "Inventario",
            icon: <BiArchive color="brown" size={"1.2rem"} />,
          },
          {
            text: "Ventas",
            icon: <BiDollarCircle color="green" size={"1.2rem"} />,
          },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <button
                onClick={() => navigate(`/${item.text}`)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                }}
              >
                <span style={{ marginRight: "10px" }}>{item.icon}</span>
                <ListItemText primary={item.text} />
              </button>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {user && (
        <ListItem disablePadding>
          <ListItemButton>
            <button
              onClick={cerrarSesion}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                color: "black",
              }}
            >
              <span style={{ marginRight: "10px" }}>
                <BiLogOut color="red" size={"1.2rem"} />
              </span>
              <ListItemText primary="Cerrar sesión" />
            </button>
          </ListItemButton>
        </ListItem>
      )}

      {user && user.role === "Admin" && (
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <button
                onClick={() => navigate("/registro")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                }}
              >
                <span style={{ marginRight: "10px" }}>
                  <BiUserPlus color="green" size={"1.2rem"} />
                </span>
                <ListItemText primary="Registro de usuario" />
              </button>
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <div>
      <React.Fragment key="left">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="fixed" sx={{ background: "#5b5b5b" }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2, outline: "none" }}
                onClick={toggleDrawer("left", true)}
              >
                <AiOutlineMenu cursor={"pointer"} />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                SmartSell
              </Typography>
              <Typography variant="h6">
                {user && "Hola, " + user.username}
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Drawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
