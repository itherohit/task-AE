import React,{useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VehiclesRow({vehicle}) {
    const [editable,setEditable] = useState(false);
    const [driverName,setDriverName] = useState(vehicle.Driver);
    const [licensePlate,setLicensePlate] = useState(vehicle.LicensePlate);
    const [office,setOffice] = useState(vehicle.Office);
    const [customerName,setCustomerName] = useState(vehicle.CustomerName);
    const [lat,setLat] = useState(vehicle.Status.location.lat);
    const [lon,setLon] = useState(vehicle.Status.location.lon);
    const [ignition,setIgnition] = useState(vehicle.Status.ignition);
    const [speed,setSpeed] = useState(vehicle.Status.speed);

    const notifySuccess = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    
      const notifyError = () => toast.error("Error Updating", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark"
      });

    const saveVehicle = () => {
        axios({
            method: 'PATCH',
            url: `${process.env.NODE_ENV === "development" ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER}/api/vehicles/` + vehicle._id,
            data: {
                CustomerName: customerName,
                DriverName: driverName,
                LicensePlate: licensePlate,
                Office: office,
                Lat: lat,
                Lon: lon,
                Ignition: ignition,
                Speed: speed
            }
        }).then(res => {
            setEditable(false);
            notifySuccess("Updated");
        }).catch(err=> {
            console.log(err);
            notifyError();
        })
    }
    return <tr className="whitespace-nowrap bg-gray-100 dark:bg-gray-800">
                <td className="px-6 py-4 text-sm text-gray-500">
                    {vehicle.Vin}
                </td>
                <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                        {editable ? 
                        <input value={driverName} className='text-center bg-transparent border-b-2 border-gray-700 w-20' onChange={(e) => {setDriverName(e.target.value)}}/> :
                        <div className="text-sm text-gray-500 text-center">{driverName}</div> }
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                    {editable ? 
                        <input value={licensePlate} className='text-center bg-transparent border-b-2 border-gray-700 w-20' onChange={(e) => {setLicensePlate(e.target.value)}}/> :
                        <div className="text-sm text-gray-500 text-center">{licensePlate}</div> }
                    </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                <div className="text-sm text-gray-500">
                    {editable ? 
                        <input value={office} className='text-center bg-transparent border-b-2 border-gray-700 w-20' onChange={(e) => {setOffice(e.target.value)}}/> :
                        <div className="text-sm text-gray-500 text-center">{office}</div> }
                    </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                <div className="text-sm text-gray-500">
                    {editable ? 
                        <input value={lat} className='text-center bg-transparent border-b-2 border-gray-700 w-20' onChange={(e) => {setLat(e.target.value)}}/> :
                        <div className="text-sm text-gray-500 text-center">{lat}</div> }
                    </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                <div className="text-sm text-gray-500">
                    {editable ? 
                        <input value={lon} className='text-center bg-transparent border-b-2 border-gray-700 w-20' onChange={(e) => {setLon(e.target.value)}}/> :
                        <div className="text-sm text-gray-500 text-center">{lon}</div> }
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{vehicle.MMY}</div>
                </td>
                <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">
                    {editable ? 
                        <input value={customerName} className='text-center bg-transparent border-b-2 border-gray-700 w-20' onChange={(e) => {setCustomerName(e.target.value)}}/> :
                        <div className="text-sm text-gray-500 text-center">{customerName}</div> }
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{vehicle.Status.ignition ? "ON" : "OFF" }</div>
                </td>
                <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{vehicle.Status.speed}</div>
                </td>
                <td className="px-6 py-4">
                    {editable ? 
                    <button className="px-4 py-1 text-sm text-white bg-green-400 rounded" onClick={saveVehicle}>Save</button> :
                    <button className="px-4 py-1 text-sm text-white bg-blue-400 rounded" onClick={() => {setEditable(true)}}>Edit</button>
                    }
                </td>
            </tr>
}

export default VehiclesRow;
