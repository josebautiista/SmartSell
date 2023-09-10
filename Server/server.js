const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const connection = require("./db");

app.use(cors());
app.use(express.json());

const network = require("network");

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
