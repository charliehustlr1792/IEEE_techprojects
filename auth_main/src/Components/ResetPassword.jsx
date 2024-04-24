import React, { useState } from "react";
import "../App.css";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link,useParams } from "react-router-dom";


const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const token=useParams()
    const navigate=useNavigate()
    const handleSubmit =(e)=>{
      e.preventDefault()
      Axios.post('https://ieee-techprojects-frontend.vercel.app/auth/reset-password/'+token,{
          password
      }).then(response =>{
          if(response.data.status){
          navigate('/login')}
      }).catch(err =>{
          console.log(err)
      })
    }
  return (
    <div className="sign-up-container">
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <h1>Reset Password</h1>

      <label htmlFor="password">New Password:</label>
        <input
          type="password"
          placeholder="*******"
          onChange={(e) => setPassword(e.target.value)}
        />


      <button type="submit">Send Email</button>
      <p>Have an Account?<Link to="/login">Reset</Link></p>
    </form>
  </div>
  )
}

export default ResetPassword

