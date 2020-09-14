require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.log(err));

module.exports = mongoose;
