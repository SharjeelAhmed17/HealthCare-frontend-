import React, { useEffect, useState } from 'react';
import avatar from '../assets/avatar.png';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import background from '../assets/heart-stethoscope.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function View_patient() {

  const [name ,setName] = useState('');
  const [age ,setAge] = useState('');
  const [gender ,setGender] = useState('');
  const [symptoms ,setSymptoms] = useState('');
  const [diagnosis ,setDiagnosis] = useState('');
  const [status ,setStatus] = useState('');
  const [medication ,setMedication] = useState('');


  const navigate = useNavigate()

   const View_patient = async ()=>{
    const data ={
        patientId : sessionStorage.getItem('patientId')
    }

    try{
      const response = await axios.post('http://localhost:3002/view_patient',data)
      console.log(response.data)

      if(response.status === 200){
          const { patient, message } = response.data

          setName(patient.fullName)
          setAge(patient.age)
          setGender(patient.gender)
          setStatus(patient.status)
          setSymptoms(patient.symptoms)
          setDiagnosis(patient.diagnosis)
          setMedication(patient.medication)

          toast.success(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          })
      }
    }catch(error){
      console.log(error)
      toast.error('Signup failed',{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } 
  }

  useEffect(()=>{
    if(sessionStorage.getItem('userRole') !== 'Doctor'){
      navigate('/cs_dashboard')
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
    View_patient()
  },[])

  const closeView = ()=>{
    navigate('/doc_dashboard')
    toast.success('view area closed', {
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
                        
                        {/* name */}
                        <div className=" rounded-t mt-6 mb-0 px-6 py-6">
                            <div className="text-center mb-2 ">
                                <img src={avatar} className=" h-20 rounded-full bg-gray-700 mt-6"/>
                            
                            </div>
                            <div className="text-center mb-3">
                                <p className="text-gray-900 text-sm font-bold">
                                    {name}
                                </p>
                            </div>
                            <hr className="mt-6 border-b-1 border-gray-400" />
                        </div>
                        {/* end */}

                        {/*form header */}
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <div className="text-gray-900 text-center mb-3 font-bold">
                            <small>Medical info:</small>
                            </div>

                            {/*form */}
                            <form className='overflow-y-auto h-80'>

                            {/*age */}
                            <div className="relative w-full mb-3">
                                <label
                                className="block uppercase text-white text-xs font-bold mb-2"
                                htmlFor="grid-password"
                                >
                                Age
                                </label>
                                <p
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                >
                                {age}
                                </p>
                            </div>

                            {/*gender */}
                            <div className="relative w-full mb-3">
                                <label
                                className="block uppercase text-white text-xs font-bold mb-2"
                                >
                                Gender
                                </label>
                                <p
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                >
                                    {gender}
                                </p>
                            </div>

                            {/*Status*/}
                            <div className="relative w-full mb-3">
                                <label
                                className="block uppercase text-white text-xs font-bold mb-2"
                                >
                                Status
                                </label>
                                <p
                                className="border-0 px-3 py-3 text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                >
                                    {status}
                                </p>
                            </div>

                            {/*Sysymptoms*/}
                            <div className="relative w-full mb-3">
                                <label
                                className="block uppercase text-white text-xs font-bold mb-2"
                                >
                                Symptoms
                                </label>
                                <p
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                >
                                    {symptoms}
                                </p>
                            </div>

                             {/*diagnosis*/}
                             <div className="relative w-full mb-3">
                                <label
                                className="block uppercase text-white text-xs font-bold mb-2"
                                >
                                Diagnosis
                                </label>
                                <p
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                >
                                    {diagnosis}
                                </p>
                            </div>

                            {/*medication*/}
                            <div className="relative w-full mb-3">
                                <label
                                className="block uppercase text-white text-xs font-bold mb-2"
                                >
                                Medication
                                </label>
                                <p
                                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                >
                                    {medication}
                                </p>
                            </div>

                            {/*button */}
                            <div className="text-center mt-6">
                                <Link to={'/doc_dashboard'}>
                                <button
                                className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mt-2 mr-1 mb-1 w-full"
                                type="button"
                                onClick={closeView}
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

