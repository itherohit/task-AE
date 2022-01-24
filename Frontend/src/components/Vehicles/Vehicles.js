import React,{useState,useEffect} from 'react';
import VehiclesTable from '../VehiclesTable/VehiclesTable';
import SearchVehicle from '../SearchVehicle/SearchVehicle';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Vehicles() {
  const [vehicles,setVehicles] = useState([]);
  const [hasMore,setHasMore] = useState(true);
  const [pageNumber,setPageNumber] = useState(1);


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

  useEffect(() => {
    let mounted = true;
    if(mounted && hasMore){
        axios({
            method: 'GET',
            url: `${process.env.NODE_ENV === "developement" ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER}/api/vehicles?page=${pageNumber}`
        }).then(res => {
            console.log(res.data);
            if(res.data.length === 0)
              setHasMore(false);
            setVehicles(prevVehicles => {
              return [...prevVehicles, ...res.data]
            })
        }).catch(e => {
          notifyError();
        })
    }
    return () => {
        mounted = false;
    }
  }, [pageNumber]);

  window.onscroll = () => {
    if(hasMore && window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
      setPageNumber(pageNumber + 1);
    }
  }
  return <div className='flex-col justify-center dark:bg-black'>
    <SearchVehicle setVehicles={setVehicles}/>
    <VehiclesTable vehicles={vehicles}/>
  </div>;
}

export default Vehicles;
