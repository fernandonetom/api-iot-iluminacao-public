const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");

// const connection = mongoose.connection;

// connection.once("open", function () {
//   console.log("MongoDB database connection established successfully");
// });

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(routes);
app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000")
);
