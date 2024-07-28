
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import "../App.css"
import axios from 'axios';
import UserLandingPage from './UserLandingPage.jsx';

const LoginPage = () =>{

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const[isUserloggedin,setisUserloggedin]=useState(false)

    const handleSubmit = () =>{

        if(username === '' || password === '') return alert('Please fill in all fields')

        axios.post('http://localhost:8000/api/v1/user/login', {
            username,
            password
        })
        .then((res)=>{

            

            alert('Login Successful')
            const token=res.data.AccessToken
            //console.log(token)
            document.cookie=`token=${token}`
           localStorage.setItem('isloggedin',true)
            setisUserloggedin(true)
            window.location.href='/UserLandingPage'
            
            
        })
        .catch((err)=>{
            alert(err.response.data.message)
            
        })

       
    }


    return(
        <div>
            
            
            <h1>Login Page</h1>
            <div className='input-field-container'>
            <input type="text" placeholder="Enter your username" onChange={(e)=>setUsername(e.target.value)}/>
            <input type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/>
            <div className='buttons'>
            <button  onClick={handleSubmit}>Login</button>
            <NavLink to='/register'><button  className='registerButton'>Register</button></NavLink>
            </div>
            </div>
            
        </div>
    )

}
export default LoginPage