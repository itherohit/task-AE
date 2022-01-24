const { Vehicle } = require("../Models/vehicle");
const Fakerator = require("fakerator");
const fakerator = Fakerator();

//Create Random data around India
// const createVehicles = async (req, res) => {
//     const cities = ["Pune","Bangalore", "Chennai","Delhi"];
//     const cars = ["Audi","Benz","Ferrari","BMW"]
//     const lats = [18.5204,12.9716,13.0827,28.7041]
//     const lons = [73.8567,77.5946,80.2707,77.1025]
//     for (let i=0;i<500;i++) {
//       const vehicle = await Vehicle.create({
//         Vin: fakerator.random.hex(6),
//         LicensePlate: fakerator.random.string(7),
//         Driver: fakerator.names.firstName(),
//         MMY: `2021, ${cars[i%4]}, A3`,
//         CustomerName: fakerator.names.firstName(),
//         Office: cities[i%4],
//         Status: {
//           ignition: fakerator.random.boolean(),
//           speed: fakerator.random.number(130),
//           location: {
//             lat: Math.random() > 0.5 ? lats[i%4] + Math.random()*10 : lats[i%4] - Math.random()*10,
//             lon: Math.random() > 0.5 ? lons[i%4] + Math.random()*10 : lons[i%4] - Math.random()*10,
//           },
//         },
//       });
//     }
//     res.send("Documents Created");
// }


//Controller To Handle GET /vehicles
const getVehicles = async (req,res) => {
    let Count = parseInt(req.query.count || "500");
    let page = parseInt(req.query.page || "0");
    let limit = parseInt(req.query.limit || "50");
    let Vin = req.query.vin || "";
    let Driver = req.query.driver || "";
    let LicensePlate = req.query.licensePlate || "";

    Count = (Count > 500) ? 500 : Count;

    let vehicles = [];
    let filter = {};
    
    if(page != 0){
        const startIndex = (page-1)*limit;
        vehicles = await Vehicle.find().limit(limit).skip(startIndex).exec();
    }
    else if(Vin!="")
      filter = { Vin: {$regex : "^" + Vin, $options: 'i' }};
    else if(Driver!="")
      filter = { Driver: {$regex : "^" + Driver, $options: 'i'}};
    else if(LicensePlate!="")
      filter = { LicensePlate: {$regex : "^" + LicensePlate, $options: 'i' }};
    else
      vehicles = await Vehicle.find().limit(Count);
    
    if(vehicles.length === 0) vehicles = await Vehicle.find(filter);
    res.send(vehicles);
}


//Controller for PATCH vehicles/:id Route which updates the Vehicle
const patchVehicles = async (req, res) => {
    const updatedoc = {
      CustomerName: req.body.CustomerName,
      Driver: req.body.DriverName,
      Office: req.body.Office,
      LicensePlate: req.body.LicensePlate,
      Status: {
        location: {
          lat: req.body.Lat,
          lon: req.body.Lon
        },
        ignition: req.body.Ignition,
        speed: req.body.Speed
      }
    }

    Vehicle.findOneAndUpdate({_id : req.params.id}, updatedoc, (err,data) => {
      if(err)
        return res.status(400).send("The vehicle with the given ID was not found.");
      else
       return res.status(200).send("Document Updated");;
    });
}

module.exports = {
    // createVehicles,
    getVehicles,
    patchVehicles
}