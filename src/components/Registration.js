import React, { useState } from 'react';
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'
import background from '../assets/heart-stethoscope.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Sign_in() {

  const [role ,setRole] = useState('');

  console.log(role)

  const navigate = useNavigate()

  const handleRegister = async (event)=>{
    event.preventDefault()

    const data = {
      googleId : sessionStorage.getItem('googleId'),
      fullName : sessionStorage.getItem('loggedUserName'),
      role : role
    }

    try{
      const response = await axios.post('http://localhost:3002/register', data)
      // console.log(response.data)

      if(response.status === 200){
            console.log(response)
            
            const { user, message} = response.data;
            sessionStorage.setItem('signinMessage', message)
            sessionStorage.setItem('loggedUserId', user.id)
            sessionStorage.setItem('loggedUserName', user.fullName)
            sessionStorage.setItem('userRole', user.role)
          
            toast.success(message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "colored",
            }
            )
            console.log(user.role)
            if (user.role === 'costumerService') {
              navigate('/cs_dashboard')
            }else
            if (user.role === 'Doctor') {
              navigate('/doc_dashboard')
            }
            else{
              navigate('/sign_in')
            }
      }
      
    }
    catch(error){
      if (error.response.status === 400) {
        // console.log(response.status)
        const { message } = error.response.data
        toast.error(message,{
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
      console.log(error)

    }
    
  }

  return (
    <>
      <main>
      <ToastContainer/>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-emerald-100"
            style={{
              backgroundImage:`url(${background})`,
              backgroundSize: "80%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-auto mb-6 shadow-lg rounded-lg bg-gray-300 bg-opacity-5 border-0">

                  {/*form */}
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-900 text-center mb-3 font-bold">
                      <small>Register your role</small>
                    </div>
                    <form onSubmit={handleRegister}>

                      {/*name*/}
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-white text-xs font-bold mb-2"
                          htmlFor="grid-name"
                        >
                          Name
                        </label>
                        <p
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow"
                        >{sessionStorage.getItem('loggedUserName')}</p>
                      </div>

                      {/*role */}
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-white text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Role
                        </label>
                        <select
                          name="role"
                          required
                          className="border-0 px-3 py-3 text-gray-900 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          style={{ transition: "all .15s ease" }}
                          value={role} onChange={(e)=>setRole(e.target.value)}
                        >
                              <option value="">Select role</option>
                              <option value="costumerService">Coustumer Service</option>
                              <option value="Doctor">Doctor</option>
                        </select>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                          Submit
                        </button>
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


