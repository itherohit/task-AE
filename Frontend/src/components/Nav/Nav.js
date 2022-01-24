import React,{useState,useEffect} from 'react';
import {CgLoadbarSound} from 'react-icons/cg';
import { Switch } from '@headlessui/react';
import {FiSun} from 'react-icons/fi';
import {RiMoonClearLine} from 'react-icons/ri';
import {AiOutlineClose} from 'react-icons/ai';
import { Link } from "react-router-dom";

function Nav() {
    const [enabled, setEnabled] = useState(false);
    const [open,setOpen] = useState(false);
    useEffect(()=>{
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
        document.documentElement.classList.add('dark');
        else
        document.documentElement.classList.remove('dark');
    },[]);

    useEffect(()=>{
        if(enabled){
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
        }
        else{
            localStorage.theme = 'light';
            document.documentElement.classList.remove('dark');
        }  
    },[enabled]);
    
    return (
        <nav className="w-full top-0 py-5 sm:px-10 flex justify-between items-center dark:bg-black">
            <p className="font-signature text-black text-4xl dark:text-white" data-aos="fade-right"><Link to="/">MOTORQ</Link></p>
            <ul className={`${open ? 'flex' : 'hidden'} fixed top-0 right-0 z-1 h-full bg-gray-100 w-full m-l-auto flex flex-col justify-around p-10 md:flex md:flex-row md:p-0 md:bg-transparent md:relative md:w-full md:h-full md:justify-center items-center dark:bg-black`}>
                <button className={`${open ? 'block' : 'hidden'}`}>
                    <AiOutlineClose onClick={()=> setOpen(!open)} className="absolute top-10 right-10 text-2xl font-bold text-gray-500"/>
                </button>
                <li  data-aos="fade-down"  data-aos-delay="200"><button onClick={()=> setOpen(false)}><Link to="/"><p className="md:hidden mx-5 font-signature text-black text-4xl dark:text-white">MOTORQ</p></Link></button></li>
                <li  data-aos="fade-down"  data-aos-delay="400"><button onClick={()=> setOpen(false)}><Link to="/dashboard" className="font-inter text-2xl md:text-base font-semibold mx-5 text-gray-500 transition-all dark:hover:text-gray-100 hover:text-gray-900" href="#about">Dashboard</Link></button></li>
                <li  data-aos="fade-down"  data-aos-delay="600"><button onClick={()=> setOpen(false)}><Link to="/vehicles" className="font-inter text-2xl md:text-base font-semibold mx-5 text-gray-500 transition-all dark:hover:text-gray-100 hover:text-gray-900" href="#works">Vehicles</Link></button></li>
                <li>
                <div className="md:hidden mx-5 flex items-center" data-aos="fade-up">
                    <Switch checked={enabled} onChange={setEnabled} className={`${ enabled ? 'bg-gray-700' : 'bg-gray-500'} relative inline-flex items-center h-6 rounded-full w-11`}>
                        <span className="sr-only">Enable notifications</span>
                        <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-all`}/>
                    </Switch>
                    {enabled ? <RiMoonClearLine className="text-yellow-500 text-xl ml-2"/> : <FiSun className="text-yellow-500 text-xl ml-2"/>}
                </div>
                </li>
            </ul>
            <div className="hidden md:flex items-center" data-aos="fade-left">
                <Switch checked={enabled} onChange={setEnabled} className={`${ enabled ? 'bg-gray-700' : 'bg-gray-500'} relative inline-flex items-center h-6 rounded-full w-11`}>
                    <span className="sr-only">Enable notifications</span>
                    <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-all`}/>
                </Switch>
                {enabled ? <RiMoonClearLine className="text-yellow-500 text-xl ml-2"/> : <FiSun className="text-yellow-500 text-xl ml-2"/>}
            </div>
            <button onClick={()=> setOpen(!open)}  data-aos="fade-left">
            <CgLoadbarSound  className="md:hidden text-4xl -rotate-90 dark:text-gray-100"/>
            </button>
        </nav>
    )
}

export default Nav