const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  Vin: { type: String, required: true, unique: true },
  LicensePlate: { type: String, required: true, unique: true },
  Driver: { type: String, required: true },
  MMY: { type: String, required: true },
  CustomerName: { type: String, required: true },
  Office: { type: String, required: true },
  Status: {
    ignition: { type: Boolean, required: true },
    speed: { type: Number, required: true },
    location: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
  },
})

const Vehicle = mongoose.model("Vehicles", Schema);

exports.Vehicle = Vehicle;