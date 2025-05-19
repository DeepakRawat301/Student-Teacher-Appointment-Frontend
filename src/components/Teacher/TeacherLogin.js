import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TeacherRegisterService from '../../services/TeacherService/TeacherRegisterService';

const TeacherLogin = () => {

  const[teacher,setTeacher]=useState({
    username:"",
    password:"",
  });

  const handleChange=(e)=>{
    const value=e.target.value;
    setTeacher({...teacher,[e.target.name]:value})
  }

  const reset=(e)=>{
    e.preventDefault();
    setTeacher({
    username:"",
    password:"",
    })
  }

  const login=(e)=>{
    e.preventDefault();
    TeacherRegisterService.login(teacher)
    .then((response)=>{
        console.log("logged in",response);
        alert("Teacher logged in successfully. Welcome to Teacher Dashboard");
        navigate("/teacherDashboard")
    })
    .catch((error)=>{
        if (error.response) {
          console.log("Backend responded with error:");
          console.log("Status:", error.response.status);
          console.log("Data:", error.response.data);     // This contains the actual error message
          alert("Error: " + error.response.data);
        } else if (error.request) {
          console.log("No response received. Request was:", error.request);
          alert("No response from server.");
        } else {
          console.log("Error in setting up request:", error.message);
          alert("Error: " + error.message);
        }
    });
  }

  const navigate = useNavigate();


  return (
    <>
    <div class='container'>
    <div class='header'>
        <div class='text'>Teacher Login Page</div>
        <div class='underline'></div>
    </div>
    <div class='inputs'>
    <div class='input'>
        <input type="text" name="username" value={teacher.username} onChange={(e)=>handleChange(e)} placeholder='Username'/>
        </div>
        <div class='input'>
        <input type="password" name="password" value={teacher.password} onChange={(e)=>handleChange(e)} placeholder='Password'/>
        </div>
    </div>
    <div class='submit'>
        <div class='submit'><button onClick={login}>Login</button></div>
        <div class='submit'><button onClick={reset}>Clear</button></div>
        <div class='submit'><button onClick={()=>navigate("/")}>Cancel</button></div>
        <div class='register_admin'><h2>New Teacher contact Admin for Registration</h2></div>
    </div>
   </div>
    </>
  )
}

export default TeacherLogin