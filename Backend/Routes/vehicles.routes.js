const express = require("express");

const vehiclesController = require("../Controllers/vehicles.controller");

const router = express.Router();

router.get("/",vehiclesController.getVehicles);

router.get("/create",vehiclesController.createVehicles);

router.patch("/:id",vehiclesController.patchVehicles);

module.exports = router;