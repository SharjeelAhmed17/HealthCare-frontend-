import React, { useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Redirect() {
    const navigate = useNavigate()

    const getuser = async ()=>{
        try {
          const response = await axios.get('http://localhost:3002/login', {
            withCredentials: true,
          });
          console.log(response.data);
      
          if (response.status === 200) {
            const { user, message, token} = response.data;
            if(user !== null){
              sessionStorage.setItem('verificationToken', token)
                sessionStorage.setItem('signinMessage', message)
                sessionStorage.setItem('loggedUserId', user.id)
                sessionStorage.setItem('loggedUserName', user.fullName)
                sessionStorage.setItem('userRole', user.role)
                sessionStorage.setItem('googleId', user.googleId)
                document.cookie = `access_token=${user.access_token}; Path=/;`;

                if (user.role === 'costumerService') {
                    navigate('/cs_dashboard')
                } else if (user.role === 'Doctor') {
                    navigate('/doc_dashboard')
                } else {
                    navigate('/registration')
                }
            }
          } else {
            window.alert('Signin failed');
          }
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(()=>{
        getuser()
      },[])
  return (
    <div>
      <h1>Redirecting.......</h1>
    </div>
  )
}
