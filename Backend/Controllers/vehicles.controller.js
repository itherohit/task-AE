const { Vehicle } = require("../Models/vehicle");
const Fakerator = require("fakerator");
const fakerator = Fakerator();

const createVehicles = async (req, res) => {
    const cities = ["Pune","Bangalore", "Chennai","Delhi"];
    const cars = ["Audi","Benz","Ferrari","BMW"]
    const lats = [18.5204,12.9716,13.0827,28.7041]
    const lons = [73.8567,77.5946,80.2707,77.1025]
    for (let i=0;i<500;i++) {
      const vehicle = await Vehicle.create({
        Vin: fakerator.random.hex(6),
        LicensePlate: fakerator.random.string(7),
        Driver: fakerator.names.firstName(),
        MMY: `2021, ${cars[i%4]}, A3`,
        CustomerName: fakerator.names.firstName(),
        Office: cities[i%4],
        Status: {
          ignition: fakerator.random.boolean(),
          speed: fakerator.random.number(130),
          location: {
            lat: lats[i%4] + Math.random()/100,
            lon: lons[i%4] + Math.random()/100,
          },
        },
      });
    }
    res.send("Documents Created");
}

const getVehicles = async (req,res) => {
    let Count = parseInt(req.query.count || "500");
    let Vin = req.query.vin || "";
    let Driver = req.query.driver || "";
    let LicensePlate = req.query.licensePlate || "";

    Count = (Count > 500) ? 500 : Count;

    let vehicles = [];

    if(Vin!="")
      vehicles = await Vehicle.find({ Vin: {$regex : "^" + Vin } });
    else if(LicensePlate!="")
      vehicles = await Vehicle.find({ LicensePlate: {$regex : "^" + LicensePlate }});
    else if(Driver!="")
      vehicles = await Vehicle.find({ Driver: {$regex : "^" + Driver }});
    else
      vehicles = await Vehicle.find().limit(Count);
    
    res.send(vehicles);
}

const patchVehicles = async (req, res) => {
    const updatedoc = {
      CustomerName: req.body.CustomerName,
      Driver: req.body.Driver,
      Office: req.body.Office,
      LicensePlate: req.body.LicensePlate,
    }
    Vehicle.findOneAndUpdate({_id : req.params.id}, updatedoc, (err,data) => {
      if(err)
        return res.status(404).send("The vehicle with the given ID was not found.");
      else
       return res.status(200).send("Document Updated");;
    });
}

module.exports = {
    createVehicles,
    getVehicles,
    patchVehicles
}