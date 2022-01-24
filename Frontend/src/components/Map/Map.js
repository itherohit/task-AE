import React, {useState,useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import axios from 'axios';
import VinSearch from './VinSearch';
import Markers from './Markers';

function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

function Map() {
    const [vehicles, setVehicles] = useState([]);
    const [centerPosition,setCenter] = useState([20.5937, 78.9629]);
    const [zoom,setZoom] = useState(5);

    useEffect(() => {
        let mounted = true;
        if(mounted){
            axios({
                method: 'GET',
                url: `${process.env.NODE_ENV === "development" ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER}/api/vehicles?count=500`
            }).then(res => {
                setVehicles(res.data);
            }).catch(e => {
                console.log(e);
            })
        }
        return () => {
            mounted = false;
        }
    }, []);

    return (
        <div>
            <VinSearch setCenter={setCenter} setZoom={setZoom}/>
            <MapContainer center={centerPosition} zoom={5} >
                <ChangeView center={centerPosition} zoom={zoom} /> 
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Markers vehicles={vehicles} />
            </MapContainer>
        </div>
    );
}

export default Map;
