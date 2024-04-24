import axios from "axios"
import React from 'react'
import {Navigate,useNavigate} from 'react-router-dom'
import '../App.css'

const Dashboard = () => {
    const navigate=useNavigate()
    axios.defaults.withCredentials=true
    const handleLogout=() =>{
        axios.get("https://ieee-techprojects-rrrn.vercel.app/auth/logout").then(res=>{
            if(res.data.status){
               Navigate('/login')
            }
        }).catch(err=>{
            console.log(err)
        }
        )
     }
  return (
    <div class="display">
        <h2>LOG IN SUCCESSFUL!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard
