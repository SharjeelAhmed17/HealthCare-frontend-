import React, { useState } from 'react';
import github from '../assets/github.svg';
import google from '../assets/google.svg';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import background from '../assets/heart-stethoscope.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Sign_in() {

  const [email ,setEmail] = useState('');
  const [password ,setPassword] = useState('');

  console.log(email)
  console.log(password)

  const navigate = useNavigate()

  const handleSign_in = async (event)=>{
    event.preventDefault()

    const data = {
      email: email,
      password : password
    }

    try{
      const response = await axios.post('http://localhost:3002/sign_in', data)
      // console.log(response.data)

      if(response.status === 200){
            // console.log(response)
            
            const { user, message, accessToken} = response.data;
            sessionStorage.setItem('verificationToken', accessToken)
            sessionStorage.setItem('signinMessage', message)
            sessionStorage.setItem('loggedUserId', user.id)
            sessionStorage.setItem('loggedUserEmail', user.email)
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

  const googlehandel = async () => {
    window.open('http://localhost:3002/auth/google', '_self');
  };

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
                  
                  {/* social Sign in */}
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-900 text-sm font-bold">
                        Sign in with
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      {/* <button
                        className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          src={github}
                        />
                        Github
                      </button> */}
                      <button
                        onClick={googlehandel}
                        className="bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        <img
                          alt="..."
                          className="w-5 mr-1"
                          src={google}
                        />
                        Google
                      </button>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  {/* end */}

                  {/*form */}
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-900 text-center mb-3 font-bold">
                      <small>Sign in to account</small>
                    </div>
                    <form onSubmit={handleSign_in}>

                      {/*email */}
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-white text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          required
                          style={{ transition: "all .15s ease" }}
                          value={email} onChange={(e)=>setEmail(e.target.value)}
                        />
                      </div>

                      {/*password */}
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-white text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password" required
                          style={{ transition: "all .15s ease" }}
                          value={password} onChange={(e)=>setPassword(e.target.value)}
                        />
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                          Sign In
                        </button>
                        <div className="text-gray-900 text-center mb-3 font-bold">
                          <small>Create an account</small>
                        </div>
                        <Link to={'/sign_up'}>
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                        >
                          Sign Up
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

