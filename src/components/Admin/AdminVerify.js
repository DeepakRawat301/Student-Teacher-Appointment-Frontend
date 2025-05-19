import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminSessionService from '../../services/AdminService/AdminSessionService';


const AdminVerify = () => {

  const[admin,verifyAdmin]=useState({
    phone:"",
    otp:"",
  });

  const handleChange=(e)=>{
    const value=e.target.value;
  verifyAdmin({...admin,[e.target.name]:value});
  };

  const reset=(e)=>{
    e.preventDefault();
    verifyAdmin({
    phone:"",
    otp:"",
    })
  }

  const verificationAdmin=(e)=>{
    e.preventDefault();
    AdminSessionService.verificationAdmin(admin)
    .then((response)=>{
        console.log("verified",response);
        alert("Verification successful! You can now log in.");
        navigate("/login")
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
  };


  const navigate = useNavigate();


  return (
    <>
    <div class='container'>
    <div class='header'>
        <div class='text'>Admin Verification</div>
        <div class='underline'></div>
    </div>
    <div class='inputs'>
        <div class='input'>
        <input type="number" name="phone" value={admin.phone} onChange={(e)=>handleChange(e)} placeholder='Phone'/>
        </div>
        <div class='input'>
        <input type="text" name="otp" value={admin.otp} onChange={(e)=>handleChange(e)} placeholder='OTP'/>
        </div>
    </div>
    <div class='submit'>
        <div class='submit'><button onClick={verificationAdmin}>Register</button></div>
        <div class='submit'><button onClick={reset}>Clear</button></div>
        <div class='submit'><button onClick={()=>navigate("/")}>Cancel</button></div>
    </div>
   </div>
    </>
  )
}

export default AdminVerify