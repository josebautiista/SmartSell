//server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/user", require("./routes/user.routes"));
app.use("/roles", require("./routes/roles.routes"));

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
