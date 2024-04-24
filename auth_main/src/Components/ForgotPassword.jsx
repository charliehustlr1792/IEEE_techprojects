import React, { useState } from "react";
import "../App.css";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate=useNavigate()
    const handleSubmit =(e)=>{
      e.preventDefault()
      Axios.post('https://ieee-techprojects-frontend.vercel.app/auth/forgot-password',{
          email
      }).then(response =>{
          if(response.data.status){
            alert("Check your Email to Reset Password")
          navigate('/login')}
          
      }).catch(err =>{
          console.log(err)
      })
    }
  return (
    <div className="sign-up-container">
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <h1>Forgot Password</h1>

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        autoComplete="off"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Send Email</button>
      <p>Have an Account?<Link to="/login">Login</Link></p>
    </form>
  </div>
  )
}

export default ForgotPassword

