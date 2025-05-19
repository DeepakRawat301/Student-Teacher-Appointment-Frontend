import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TeacherRegisterService from '../../services/TeacherService/TeacherRegisterService';

const TeacherRegister = () => {

  const[teacher,registerTeacher]=useState({
    username: '',
    name: '',
    mail: '',
    password: '',
    phone: '',
    department: '',
    subjects: '',
    available: false
    });

    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      registerTeacher({
        ...teacher,
        [name]: type === 'checkbox' ? checked : value
      });
    };


    const reset = (e) => {
      e.preventDefault();
      registerTeacher({
        username: '',
        name: '',
        mail: '',
        password: '',
        phone: '',
        department: '',
        subjects: '',
        available: false
      });
    };

    const saveTeacher = (e) => {
      e.preventDefault();
    
      const teacherDto = {
        ...teacher,
        subjects: teacher.subjects.split(',').map(s => s.trim()), // Convert string to array
      };
    
      TeacherRegisterService.saveTeacher(teacherDto)
        .then((response) => {
          console.log("saved", response);
          alert("Details Saved! Verify your Mail.");
          navigate("/teacherVerify");
        })
        .catch((error) => {
          if (error.response) {
            console.log("Backend responded with error:");
            console.log("Status:", error.response.status);
            console.log("Data:", error.response.data);
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
        <div class='text'>Teacher Registration Form</div>
        <div class='underline'></div>
    </div>
    <div class='inputs'>
        <div class='input'>
        <input type="text" name="username" value={teacher.username} onChange={(e)=>handleChange(e)} placeholder='Username'/>
        </div>
        <div class='input'>
        <input type="text" name="name" value={teacher.name} onChange={(e)=>handleChange(e)} placeholder='Name'/>
        </div>
        <div class='input'>
        <input type="email" name="mail" value={teacher.mail} onChange={(e)=>handleChange(e)} placeholder='Mail'/>
        </div>
        <div class='input'>
        <input type="password" name="password" value={teacher.password} onChange={(e)=>handleChange(e)} placeholder='Password'/>
        </div>
        <div class='input'>
        <input type="number" name="phone" value={teacher.phone} onChange={(e)=>handleChange(e)} placeholder='Phone'/>
        </div>
        <div class='input'>
        <input type="text" name="department" value={teacher.department} onChange={(e)=>handleChange(e)} placeholder='Department'/>
        </div>
        <div class='input'>
        <input type="text" name="subjects" value={teacher.subjects} onChange={(e)=>handleChange(e)} placeholder='Enter Multiple Subjects Seperated By Comma'/>
        </div>
        <div className="input">
          <label>
            <input type="checkbox" name="available" checked={teacher.available} onChange={handleChange} />
            Available
          </label>
        </div>
        
    </div>
    <div class='submit'>
        <div class='submit'><button onClick={saveTeacher}>Next</button></div>
        <div class='submit'><button onClick={reset}>Clear</button></div>
        <div class='submit'><button onClick={()=>navigate("/adminDashboard")}>Cancel</button></div>
    </div>
   </div>
   <div class="input"><button onClick={() => navigate("/logout")}>Logout</button></div>
    </>
  )
}

export default TeacherRegister