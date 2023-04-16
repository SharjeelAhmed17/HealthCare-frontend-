import React, { useState, useEffect } from 'react';
import avatar from '../assets/avatar.png';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import background from '../assets/heart-stethoscope.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Add() {

    const [fullName, setFullname ] = useState('')
    const [gender, setGender ] = useState('')
    const [doctor, setDoctor] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [age, setAge] = useState('');
    const [status, setStatus ] = useState('')
    console.log(doctors, "doctors")
  
    const navigate = useNavigate();
  
  useEffect(()=>{
    if(sessionStorage.getItem('userRole') !== 'costumerService'){
      navigate('/doc_dashboard')
      toast.error("Access denied", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      }
      )
    }
      selectDoc()
  },[])
    const handleAddPatient = async (event)=>{
      event.preventDefault();
      const data ={
          fullName : fullName,
          gender : gender,
          costumerService : sessionStorage.getItem('loggedUserId'),
          Doctor : doctor,
          age : age,
          status : status
      }
    
      try{
        const response = await axios.post('http://localhost:3002/add_patient', data)
        console.log(response)
      
        const { message } = response.data
    
        if(response.status === 200){
          setFullname('');
          setGender('')
          setAge('')
          setDoctor('')
          setStatus('')
  
          toast.success(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          })}
  
      } catch(error){
        console.log(error)
        toast.error('failed to add',{
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        })}
    }
  
    const selectDoc = async () =>{
      try{
          const response = await axios.post('http://localhost:3002/select_doc')
  
          if(response.status === 200){
              const { doctor, message } = response.data
              setDoctors(doctor)
              console.log(message)
          }
      } catch(error){
        console.log(error)
        if(error.response.status === 400){
          const { message } = error.response.data
          console.log(message)
      }
      }
    }
  
    const close = ()=>{
      navigate('/cs_dashboard')
      toast.success('Task area closed', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      }
      )
    }

  return (
    <>
      <main>
      <ToastContainer/>
        <section className="absolute w-full h-full">
            <div
                className="absolute top-0 w-full h-full bg-emerald-100"
                style={{
                // backgroundImage:`url(${background})`,
                backgroundSize: "80%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
                }}
            ></div>
                <div className="container mx-auto px-4 h-full">
                    <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-auto mb-6 shadow-lg rounded-lg bg-gray-300 bg-opacity-5 border-0">
                        
                        {/* image */}
                        <div className=" rounded-t mt-6 mb-0 px-6 py-6">
                            <div className="text-center mb-2 ">
                                <img src={avatar} className=" h-20 rounded-full bg-gray-700 mt-6"/>
                            </div>
                            <hr className="mt-6 border-b-1 border-gray-400" />
                        </div>
                        {/* end */}

                        {/*form header */}
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <div className="text-gray-900 text-center mb-3 font-bold">
                            <small>Patient info:</small>
                            </div>

                            {/*form */}
                            <form onSubmit={handleAddPatient} className='overflow-y-auto h-80'>

                            {/*name*/}
                            <div className="relative w-full mb-3">
                                <label
                                className="block uppercase text-white text-xs font-bold mb-2"
                                >
                                Name
                                </label>
                                <input
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                placeholder="Name" required
                                style={{ transition: "all .15s ease" }}
                                value={fullName} onChange={(e)=>setFullname(e.target.value)}
                                />
                            </div>

                            {/*age*/}
                            <div className="relative w-full mb-3">
                                <label
                                className="block uppercase text-white text-xs font-bold mb-2"
                                >
                                Age
                                </label>
                                <input
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                placeholder="Age" required
                                style={{ transition: "all .15s ease" }}
                                value={age} onChange={(e)=>setAge(e.target.value)}
                                />
                            </div>

                            {/*gender*/}
                            <div className="relative w-full mb-3">
                                <label
                                className="block uppercase text-white text-xs font-bold mb-2"
                                >
                                Gender
                                </label>
                                <select
                                name="gender"
                                required
                                className="border-0 px-3 py-3 text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                style={{ transition: "all .15s ease" }}
                                value={gender} onChange={(e)=>setGender(e.target.value)}
                                >
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/*Status*/}
                            <div className="relative w-full mb-3">
                                <label
                                className="block uppercase text-white text-xs font-bold mb-2"
                                >
                                Status
                                </label>
                                <select
                                name="status"
                                required
                                className="border-0 px-3 py-3 text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                style={{ transition: "all .15s ease" }}
                                value={status} onChange={(e)=>setStatus(e.target.value)}
                                >
                                    <option value="">Select status</option>
                                    <option value="OPD">OPD</option>
                                    <option value="ICU">ICU</option>
                                    <option value="discharged">Discharged</option>
                                </select>
                            </div>

                            {/*doctor*/}
                            <div className="relative w-full mb-3">
                                <label
                                className="block uppercase text-white text-xs font-bold mb-2"
                                >
                                Status
                                </label>
                                <select
                                name="status"
                                required
                                className="border-0 px-3 py-3 text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                style={{ transition: "all .15s ease" }}
                                value={doctor} onChange={(e)=>setDoctor(e.target.value)}
                                >
                                    <option value="">Select doctor</option>
                                    {doctors.map((item)=>{
                                        return(
                                            <option value={item.id}>{item.fullName}</option>
                                        )})
                                    }
                                </select>
                            </div>

                            {/*button */}
                            <div className="text-center mt-6">
                                <button
                                className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                                type="submit"
                                style={{ transition: "all .15s ease" }}
                                >
                                Submit
                                </button>
                                
                                <Link to={'/cs_dashboard'}>
                                <button
                                className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-2 mr-1 mb-1 w-full"
                                type="button"
                                onClick={close}
                                style={{ transition: "all .15s ease" }}
                                >
                                close
                                </button>
                                </Link>
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
        </section>
      </main>
    </>
  )
}
