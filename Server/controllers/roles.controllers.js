const connection = require("../db");

exports.getAllRoles = (req, res) => {
  const query = "SELECT * FROM roles";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al obtener roles: " + error.message);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
    res.json(results);
  });
};
