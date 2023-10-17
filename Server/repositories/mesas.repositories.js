const connection = require("../db");

exports.getMesas = (callback) => {
  connection.query("SELECT * FROM mesas", (err, result) => {
    if (err) {
      console.error(err);
      return callback(err, null);
    } else {
      return callback(null, result);
    }
  });
};

exports.crearMesa = (capacidad, estado, callback) => {
  connection.query(
    "INSERT INTO mesas (capacidad, estado) VALUES (?, ?)",
    [capacidad, estado],
    (err, result) => {
      if (err) {
        console.error("Error al crear la nueva mesa: " + err.stack);
        return callback(err, null);
      } else {
        return callback(null, { message: "Mesa agregada correctamente." });
      }
    }
  );
};
