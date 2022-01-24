const express = require("express");

const vehiclesController = require("../Controllers/vehicles.controller");

const router = express.Router();

//GET Route for /vehicles Endpoint
router.get("/",vehiclesController.getVehicles);

//Route to create Records in the Database
router.post("/create",vehiclesController.createVehicles);

//PATCH Route to Modify the Vechicle Data using ID
router.patch("/:id",vehiclesController.patchVehicles);

module.exports = router;