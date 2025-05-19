import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TeacherRegisterService from '../../services/TeacherService/TeacherRegisterService';

const UpdateTeacher = () => {

const {username}=useParams();
const navigate = useNavigate();

const[teacher,setTeacher]=useState({
    username:"",
    name:"",
    mail:"",
    phone:"",
    department:"",
    subjects:[],
    });

    const [subjectsString, setSubjectsString] = useState("");


const handleChange=(e)=>{
    const value=e.target.value;
    setTeacher({...teacher,[e.target.name]:value})
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TeacherRegisterService.getTeacherByUsername(username);
                setTeacher(response.data);
                setSubjectsString(response.data.subjects.join(', ')); // convert array to string for input
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [username]);
    

        
    const updateTeacher = (e) => {
        e.preventDefault();
    
        const updatedTeacher = {
            ...teacher,
            subjects: subjectsString.split(',').map(sub => sub.trim()) // convert string to array
        };
    
        TeacherRegisterService.updateTeacherByUsername(updatedTeacher,teacher.username)
            .then((response) => {
                console.log("saved", response);
                alert("Data Updated Successfully.");
                navigate("/allTeacher");
            })
            .catch((error) => {
                console.log(error);
                alert("Update failed. Please check the data and try again.");
            });
    };
    
    
            
    
  return (
    <>
       <div class='container'>
    <div class='header'>
        <div class='text'>Update Teacher</div>
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
        <input type="number" name="phone" value={teacher.phone} onChange={(e)=>handleChange(e)} placeholder='Phone'/>
        </div>
        <div class='input'>
        <input type="text" name="department" value={teacher.department} onChange={(e)=>handleChange(e)} placeholder='Department'/>
        </div>
        <div class='input'>
        <input
  type="text"
  name="subjects"
  value={subjectsString}
  onChange={(e) => setSubjectsString(e.target.value)}
  placeholder="Enter Multiple Subjects Separated By Comma"
/>

        </div>
        
    </div>
    <div class='submit'>
    <div class='submit'><button onClick={updateTeacher}>Update</button></div>
    <div class='submit'><button onClick={()=>navigate("/adminDashboard")}>Cancel</button></div>
    </div>
   </div>
   <div class="input"><button onClick={() => navigate("/logout")}>Logout</button></div>
    </>
  )
}

export default UpdateTeacher