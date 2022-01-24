import React,{useState,useEffect} from 'react';
import VehiclesTable from '../VehiclesTable/VehiclesTable';
import SearchVehicle from '../SearchVehicle/SearchVehicle';
import axios from 'axios';

function Vehicles() {
  const [vehicles,setVehicles] = useState([]);

  useEffect(() => {
    let mounted = true;
    if(mounted){
        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/vehicles?count=500'
        }).then(res => {
            setVehicles(res.data);
        })
    }
    return () => {
        mounted = false;
    }
  }, []);

  return <div className='flex-col justify-center dark:bg-black'>
    <SearchVehicle setVehicles={setVehicles}/>
    <VehiclesTable vehicles={vehicles}/>
  </div>;
}

export default Vehicles;
