const connection = require("../db");

exports.getMediosDePago = (callback) => {
  connection.query("SELECT * FROM medios_de_pago", (err, results) => {
    if (err) {
      console.error("Error al obtener los medios de pago:", err);
      return callback(err, null);
    } else {
      return callback(null, results);
    }
  });
};
