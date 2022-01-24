import React,{useState,useEffect} from 'react';
import {BiSearch} from 'react-icons/bi';
import axios from 'axios';

function SearchVehicle({setVehicles}) {
    const [searchValue,setSearchValue] = useState("");
    const [searchParam,setSearchParam] = useState("vin");
    const [mounted,setMounted] = useState(false);

    useEffect(()=>{
        if(mounted){
            axios({
                method: 'GET',
                url: `${process.env.NODE_ENV === "developement" ? process.env.REACT_APP_DEV_SERVER : process.env.REACT_APP_PROD_SERVER}/api/vehicles?` + searchParam + "=" + searchValue,
            }).then(res => {
                setVehicles(res.data);
                console.log(res.data);
            })
        }
        setMounted(true);
        return () => {
            setMounted(false);
        }
    },[searchValue,searchParam]);

  return <div className='px-10 content-center'>
      <div className='flex justify-center content-center'>
        <input type="text" className='bg-gray-200 px-2 py-1 rounded w-50' placeholder='Search' value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}}/>
        <BiSearch className='text-gray-800 text-2xl ml-2 my-auto'/>
      </div>
      <div className='flex justify-center content-center m-5'>
        <button type="button" className={searchParam === "vin" ? "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" : "bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"} onClick={() => {setSearchParam("vin")}}>Vin</button>
        <button type="button" className={searchParam === "driver" ? "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" : "bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"} onClick={() => {setSearchParam("driver")}}>Driver</button>
        <button type="button" className={searchParam === "licensePlate" ? "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" : "bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"} onClick={() => {setSearchParam("licensePlate")}}>License Plate</button>
      </div>
  </div>;
}

export default SearchVehicle;
