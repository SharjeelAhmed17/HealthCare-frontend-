import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Doc_map({ id, fullName, gender, age, status, doctor, costumerService, handleDocMap }) {
const navigate = useNavigate()

const dis = async(event, id)=>{
    event.preventDefault()
    const data = {
        patientId : id
    }
    try{
        const response = await axios.post('http://localhost:3002/patient_dis', data)

        if(response.status === 200){
            const { message } = response.data
            toast.success(message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'colored',
              });
              handleDocMap()
        }
    }catch (error) {
        console.log(error);
      }
}

const add_med = async (event, id)=>{
 event.preventDefault();
    sessionStorage.setItem('patientId', id)
    navigate('/add_medication')
}
const review = async (event, id)=>{
 event.preventDefault();
    sessionStorage.setItem('patientId', id)
    navigate('/view_patient')
}
    
  return (
        <div className='m-6 flex w-50 p-3 border-solid bg-gray-200 rounded-lg shadow-2xl '>
            <ToastContainer/>
            {/*patient info */}
            <div className='w-[260px] mx-2 my-4 bg-gray'>
                <label className='d-flex justify-content-start'>Patient name:</label>
                <p className='patient_name font-bold'>{fullName}</p>
                <label className='d-flex justify-content-start'>Gender:</label>
                <p className='patient_gender font-bold'>{gender}</p>
                <label className='d-flex justify-content-start'>Age:</label>
                <span className='patient_age font-bold ml-2'>{age}</span>
                <div>
                    <label className='d-flex justify-content-start'>Status:</label>
                    <span className='patient_stauts font-bold ml-2'>{status}</span>
                </div>
                
                {/*doctor */}
                <div className="doctor flex flex-row flex-wrap justify-evenly mt-2">
                    <label className='d-flex justify-content-start'>assign to:</label>
                    <p className='doctor font-bold'>{doctor}</p>
                </div>

                {/*team */}
                <div className="team_member flex flex-row flex-wrap justify-evenly">
                    <label className='d-flex justify-content-start'>created by:</label>
                    <p className='costumerService font-bold'>{costumerService}</p>
                </div>

                {/*button */}
                    <div className="button flex flex-col flex-nowrap justify-evenly mt-2">
                    <button  
                    onClick={(event)=>review(event, id)}
                    className= ' mt-2 rounded-lg px-4 py-1 bg-gray-900 text-white hover:bg-gray-700 hover:text-white'> Review 
                    </button>
                    <button  
                    onClick={(event)=>add_med(event, id)}
                    className= ' mt-2 rounded-lg px-4 py-1 bg-gray-900 text-white hover:bg-gray-700 hover:text-white'> Medication 
                    </button>
                    { status != "discharged"?
                    <button  
                    onClick={(event)=>dis(event, id)}
                    className= ' mt-2 rounded-lg px-4 py-1 bg-gray-900 text-white hover:bg-gray-700 hover:text-white'> Discharge 
                    </button>:
                    <div></div>}
                    </div>
            </div>
        
    </div>
  )
}
