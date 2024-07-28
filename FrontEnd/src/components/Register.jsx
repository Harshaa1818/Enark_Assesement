import { useState } from "react"
import axios from "axios";

const Register=()=>{

    const [username,setUserName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handleRegister=()=>{
        if(username === '' || email === '' || password === '') return alert('Please fill in all fields')
        axios.post('http://localhost:8000/api/v1/user/register',{
            username,
            email,
            password
        })
        .then((res)=>{
           
                alert('Registration Successful')
                window.location.href='/login'
            })
           
        
        .catch((error)=>{
            console.log(error)
    })
}

    return(
        <div>
        <h1>Register Page</h1>
        <div className='input-field-container'>
        <input type="text"  onChange={e=>setUserName(e.target.value)} placeholder="Enter your username"/>
        <input type="text"  onChange={e=>setEmail(e.target.value)} placeholder="Enter your email"/>
        <input type="password" onChange={e=>setPassword(e.target.value)} placeholder="Enter your password"/>
        <button onClick={handleRegister} >Register</button>
        
        </div>
    </div>
    )

}
export default Register