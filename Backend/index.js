const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

const vehiclesRoutes = require("./Routes/vehicles.routes");

const app = express();

mongoose
  .connect("mongodb+srv://itherohit:admin@cluster0.hfpba.mongodb.net/Motorq?retryWrites=true&w=majority")
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
