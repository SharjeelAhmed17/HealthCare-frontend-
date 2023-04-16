import React, { useEffect, useState } from 'react';
import avatar from '../assets/avatar.png'
import opd from '../assets/opd.png'
import icu from '../assets/icu.png'
import discharge from '../assets/discharge.jpg'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Doc_map from './Doc_map';
import { useDispatch, useSelector } from 'react-redux';
import { Doc_OPDSelect, Doc_OPD } from '../features/Doc_OPDCount'
import { Doc_ICUSelect, Doc_ICU } from '../features/Doc_ICUCount'
import { Doc_DischargedSelect, Doc_Discharged} from '../features/Doc_DischargedCount'

export default function Doctor_dash() {
  const navigate = useNavigate();
  const [OPD, setOPD] = useState([])
  const [ICU, setICU] = useState([])
  const [discharged, setDischarged] = useState([])
  const dispatch = useDispatch()

  const OPDcounts = useSelector(Doc_OPDSelect) 
  const ICUcounts = useSelector(Doc_ICUSelect) 
  const Dischargedcounts = useSelector(Doc_DischargedSelect)

  const handleDocMap = async () => {
    try {
      const data = {
        userId: sessionStorage.getItem('loggedUserId'),
        email : sessionStorage.getItem('loggedUserEmail')
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('verificationToken')}`
      }

      const response = await axios.post('http://localhost:3002/doc_patientList', data, { headers, withCredentials: true });
      console.log(response);
  
      if (response.status === 200) {
        const { OPD, ICU, discharged, OPDcount, ICUcount, dischargedcount } = response.data;
        setOPD(OPD);
        setICU(ICU);
        setDischarged(discharged);
        console.log(OPDcount, "opd")
        console.log(ICUcount,"icu")
        console.log(dischargedcount,"discharged")
        dispatch(Doc_OPD(OPDcount))
        dispatch(Doc_ICU(ICUcount))
        dispatch(Doc_Discharged(dischargedcount))
      }
    }catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        const { message } = error.response.data;
        toast.error(message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      }
    }
  }
  useEffect(() => {
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

  }, []) 

  useEffect(()=>{
    handleDocMap()
  },[])


  const signOut = ()=>{

    document.cookie.split(";").forEach(function(c) {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    sessionStorage.clear();
    toast.success("Singout successful", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    }
    )
    navigate('/sign_in')
  }


  return (
    <>
      <main>
      <ToastContainer/>
        <section className="absolute w-full h-full flex flex-row text-center">
            <sideBar className= ' basis-1/6 bg-gray-900 text-white h-screen '>
                    <div className='shrink profile p-2 flex flex-col justify-center'>
                        <img src={avatar}  className="profile_img h-21 ml-12 mr-12 mt-4 mb-4 rounded-full border-4 border-white bg-gray-500" />
                        <div className="profile_info font-bold">
                            <p className='User_name'>{sessionStorage.getItem('loggedUserName')}</p>
                            <p className='User_role mt-1'> {sessionStorage.getItem("userRole") === "costumerService"
                                ? "Coustumer Representative"
                                : sessionStorage.getItem("userRole") === "Doctor"
                                ? "Doctor"
                                : null}</p>
                        </div>
                    </div>
                    <hr />
                    <button
                      className="bg-red-200 text-black active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full inline-flex items-center justify-center text-xs">
                        <img src={opd}  className=' h-5'/>
                        <span className='ml-3'> Doctor OPD ({OPDcounts})</span>
                    </button>
                    <hr />
                    <button
                      className="bg-red-500 text-black active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full inline-flex items-center justify-center text-xs">
                        <img src={icu}  className=' h-5'/>
                        <span className='ml-3'> Doctor ICU ({ICUcounts}) </span>
                    </button>
                    <hr />
                    <button
                      className="bg-lime-500 text-black active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full inline-flex items-center justify-center text-xs">
                        <img src={discharge}  className=' h-5'/>
                        <span className='ml-3'> Doctor Discharged ({Dischargedcounts}) </span>
                    </button>
                    <hr />
                    <button
                    onClick={signOut} 
                      className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full inline-flex items-center justify-center text-xs">
                        <img src={avatar}  className=' h-5'/>
                        <span className='ml-3'> log Out</span>
                    </button>
                    <hr />
            </sideBar>

            <div className=" basis-5/6 container mt-5 overflow-y-auto h-90">
                <div className="flex content-center items-center justify-center">
                <div className="  px-4">

                    <div className="relative flex flex-row min-w-0 break-words w-auto mb-6  rounded-lg bg-gray-300 bg-opacity-5 border-0">
                    {/*OPD */}
                    <div className=" rounded-t mt-6 mb-0 px-6 py-6">
                        <div className="text-center mb-2 ">
                        {OPD.length>0?
                            OPD.map((item)=>{
                              return <Doc_map id={item.id} fullName={item.fullName} gender={item.gender} age={item.age} status={item.status} doctor={item.doctor} costumerService={item.costumerService} handleDocMap={handleDocMap} />
                            })
                            :<div></div>}
                        </div>
                    </div>
                    {/*ICU */}
                    <div className=" rounded-t mt-6 mb-0 px-6 py-6">
                        <div className="text-center mb-2 ">
                        {ICU.length>0?
                            ICU.map((item)=>{
                              return <Doc_map id={item.id} fullName={item.fullName} gender={item.gender} age={item.age} status={item.status} doctor={item.doctor} costumerService={item.costumerService} handleDocMap={handleDocMap} />
                            })
                            :<div></div>}
                        </div>
                    </div>
                    {/*Discharged */}
                    <div className=" rounded-t mt-6 mb-0 px-6 py-6">
                        <div className="text-center mb-2 ">
                        {discharged.length>0?
                            discharged.map((item)=>{
                              return <Doc_map id={item.id} fullName={item.fullName} gender={item.gender} age={item.age} status={item.status} doctor={item.doctor} costumerService={item.costumerService} handleDocMap={handleDocMap} />
                            })
                            :<div></div>}
                        </div>
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
