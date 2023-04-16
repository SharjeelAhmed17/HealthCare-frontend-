import React, { useEffect } from 'react'
import axios from 'axios';

export default function Home() {
    const getuser = async ()=>{
        try {
          const response = await axios.get('http://localhost:3002/login', {
            withCredentials: true,
          });
          console.log(response);
      
        //   if (response.status === 200) {
        //     const { user, message, token} = response.data;
        //     if(user !== null){
        //       sessionStorage.setItem('verificationToken', token)
        //       sessionStorage.setItem('signinMessage', message)
        //       sessionStorage.setItem('loggedUserId', user._id)
        //       sessionStorage.setItem('loggedUserEmail', user.email)
        //       sessionStorage.setItem('userole', user.role)
        //     }
        //   } else {
        //     window.alert('Signin failed');
        //   }
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(()=>{
        getuser()
      },[])
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  )
}
