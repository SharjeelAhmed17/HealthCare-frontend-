import React, { useState, useEffect } from 'react'
import avatar from '../assets/avatar.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Add_patient() {

  const [fullName, setFullname ] = useState('')
  const [gender, setGender ] = useState('')
  const [doctor, setDoctor] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [age, setAge] = useState('');
  const [status, setStatus ] = useState('')
  console.log(doctors, "doctors")

  const navigate = useNavigate();

useEffect(()=>{
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

  const closeTask = ()=>{
    navigate('/cs_dashboard')
    toast.success('Add patient area closed', {
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
    <div>
      <ToastContainer/>
      <content className='flex flex-col flex-nowrap justify_center items_center' style={{height:'100vh', textAlign:'center'}}>
        
        <div className='container w-100 min-w-fit items-center justify-center'>
            <div className='task_title flex flex-wrap items-center justify-center border-4 border-white min-w-fit mx-20 rounded-t-lg shadow-2xl mt-4'>
              <p className='bg-gray-900 w-100 px-12 text-white rounded-t-lg grow'>Add Patient</p>
           </div>
            <div className='add_container flex flex-wrap items-center justify-center border-4 border-white w-100 mx-20 rounded-b-lg overflow-y-auto h-100'>
              
              {/*form */}
              <form onSubmit={handleAddPatient}>
                  <div className='m-6 flex  justify-center flex-col flex-nowrap w-100 p-3 border-solid bg-gray-200 rounded-lg shadow-2xl '>
                    {/*Patient name */}
                    <div className='w-80 mx-2 my-4 bg-gray'>
                      <div className="patient_name flex flex-row flex-wrap justify-evenly mt-2">
                      <label className='d-flex justify-content-start'>Patient name:</label>
                      <input type="text" name="task_name" placeholder='Name' required 
                        value={fullName} onChange={(e)=>setFullname(e.target.value)}
                        className=" w-40 border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"/>
                      </div>

                      {/* task description */}
                      {/* <div className="task_description">
                      <label className=''>Task description:</label>
                      <textarea type="text" name="task_name" placeholder='Task description' required  
                        value={description} onChange={(e)=>setDescription(e.target.value)}
                        className=" w-40 border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"/>
                      </div> */}

                      {/*patient age */}
                      <div className="mt-3 age flex flex-row flex-wrap justify-evenly mt-2">
                      <label className='d-flex justify-content-start'>Age:</label>
                      <input type="text" name="age" placeholder='age'
                        value={age} onChange={(e)=>setAge(e.target.value)}
                        className=" w-40 border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"/>
                      </div>

                       {/*gender*/}
                      <div className="mt-3 gender flex flex-row flex-wrap justify-evenly">
                      <label className='d-flex justify-content-start'>Gender:</label>
                      <select
                          name="gender"
                          required
                          className="w-40 border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          style={{ transition: "all .15s ease" }}
                          value={gender} onChange={(e)=>setGender(e.target.value)}
                        >
                              <option value="">Select gender</option>
                              <option value="male">Male</option>
                              <option value="female">female</option>
                              <option value="other">Other</option>
                        </select>
                      </div>
                      
                       {/*Status*/}
                      <div className="mt-3 team_member flex flex-row flex-wrap justify-evenly">
                      <label className='d-flex justify-content-start'>Status:</label>
                      <select name="status" required
                        value={status} onChange={(e)=>setStatus(e.target.value)}
                       className=" w-40 border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full">
                              <option value="">Select status</option>
                              <option value="OPD">OPD</option>
                              <option value="ICU">ICU</option>
                      </select>
                      </div>

                       {/*doctor*/}
                      <div className="mt-3 team_member flex flex-row flex-wrap justify-evenly">
                      <label className='d-flex justify-content-start'>Doctors:</label>
                      <select name="status"required
                        value={doctor} onChange={(e)=>setDoctor(e.target.value)}
                        className=" w-40 border-0 px-1 py-1 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full">
                              <option value="">Select doctor</option>
                              {doctors.map((item)=>{
                                return(
                                    <option value={item.id}>{item.fullName}</option>
                                )
                              })

                              }
                      </select>
                      </div>

                      {/*button */}
                      <div className="button flex flex-row flex-wrap justify-evenly mt-2">
                        <button 
                            type='button'
                            onClick={closeTask} 
                            className= ' mt-2 rounded-lg px-4 py-1 bg-gray-900 text-white hover:bg-gray-700 hover:text-white'>
                            close 
                        </button>
                        <button  
                            type='submit'
                            className= ' mt-2 rounded-lg px-4 py-1 bg-gray-900 text-white hover:bg-gray-700 hover:text-white'>
                            Submit 
                        </button>
                      </div>
                    </div>
                 
                
                  </div>
              </form>
              
            </div>
        </div>
        
      </content>

      
    </div>
  )
}

