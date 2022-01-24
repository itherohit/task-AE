import React from 'react';
import { Marker, Tooltip} from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";

function Markers({vehicles}) {
    let markers = vehicles.map(vehicle => {
        return <Marker position={[vehicle.Status.location.lat,vehicle.Status.location.lon]} key={vehicle.Vin}>
                  {/* Popups on Hover */}
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
}

export default Markers;
