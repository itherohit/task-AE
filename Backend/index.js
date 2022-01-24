const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
require('dotenv/config');
const vehiclesRoutes = require("./Routes/vehicles.routes");

const app = express();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => console.error(err));


app.use(helmet());
app.use(cors());
app.use(express.json());


app.use("/api/vehicles", vehiclesRoutes);

app.get("*", (req, res) => {
  res.redirect("/api/vehicles");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
