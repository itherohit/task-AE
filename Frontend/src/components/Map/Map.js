import React, {useState,useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import axios from 'axios';

function Map() {
    const [vehicles, setVehicles] = useState([]);
    const centerPosition = [20.5937, 78.9629];
    
    useEffect(() => {
        let mounted = true;
        if(mounted){
            axios({
                method: 'GET',
                url: `${process.env.NODE_ENV === "developement" ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER}/api/vehicles?count=500`
            }).then(res => {
                setVehicles(res.data);
            })
        }
        return () => {
            mounted = false;
        }
    }, []);

    const Markers = ({vehicles}) => {
        let markers = vehicles.map((vehicle,index)=>{
          return <Marker 
                    position={[vehicle.Status.location.lat,vehicle.Status.location.lon]} key={index}>
                    <Tooltip>
                        <div className='px-2 py-1 w-40'>
                            <div className='flex justify-between'>
                                <p className='text-gray-500 font-black'>Driver</p>
                                <p className='font-bold'>{vehicle.Driver}</p>
                                
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-500 font-black'>Ignition</p>
                                <p className={vehicle.Status.ignition ? "text-green-800 font-bold" : "text-red-800 font-bold"}>{vehicle.Status.ignition ? "ON" : "OFF"}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-500 font-black'>VIN</p>
                                <p className='font-bold'>{vehicle.Vin}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-500 font-black'>Speed</p>
                                <p className='font-bold'>{vehicle.Status.speed} km/hr</p>
                            </div>
                        </div>
                    </Tooltip>
                  </Marker>
        })
        return <MarkerClusterGroup className="cluster">{markers}</MarkerClusterGroup>;
    };
    return (
        <MapContainer center={centerPosition} zoom={5} >
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Markers vehicles={vehicles} />
        </MapContainer>
    );
}

export default Map;
