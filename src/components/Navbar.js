import React from 'react'
import { useNavigate } from 'react-router-dom';    

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <>
         <div class='head'>
        <h1 id='first_head'>Welcome to Student Teacher Appointment System</h1>
        <a id='home_link'>Home</a>
        <button onClick={()=> navigate("/studentlogin")}>Student</button>
        <button onClick={()=> navigate("/teacherlogin")}>Teacher</button>
        <button onClick={()=> navigate("/login")}>Admin</button>
      </div>
    </>
  )
}

export default Navbar