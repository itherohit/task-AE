import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VinSearch({setCenter,setZoom}) {
    const [vin,setVin] = useState("");

    const notifyError = () => toast.error("Invalid Vin", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
    });

    useEffect(()=>{
        let mounted = true;
        if(mounted && vin.length === 6){
            axios({
                method: 'GET',
                url: `${process.env.NODE_ENV === "development" ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER}/api/vehicles?vin=${vin}`
            }).then(res => {
                if(res.data.length === 0){
                    notifyError();
                    setZoom(5)
                }else{
                    setCenter([res.data[0].Status.location.lat,res.data[0].Status.location.lon]);
                    setZoom(10);
                }  
            }).catch(e => {
                console.log(e);
            })
        }
        return () => {
            mounted = false;
        }
    },[vin]);
    
  return <input class="w-50 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline absolute right-0 z-1" id="username" type="text" placeholder="VIN" onChange={(e) => {setVin(e.target.value)}}/>;
}

export default VinSearch;
