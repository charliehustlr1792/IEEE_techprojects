import axios from "axios"
import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import '../App.css'
const Home = () => {
    const navigate=useNavigate()
    axios.defaults.withCredentials=true
  return (
    <div class='display'>
      <h2>HOME</h2>
      <button><p>
          Create your Account <Link to="/signup">Signup</Link>
        </p></button>
      
        
    </div>
  )
}

export default Home