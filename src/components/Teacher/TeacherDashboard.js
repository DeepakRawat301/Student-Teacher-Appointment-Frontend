import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TeacherRegisterService from '../../services/TeacherService/TeacherRegisterService';

const TeacherDashboard = () => {

    const navigate = useNavigate();
 
    const [username, setUsername] = useState("");

    useEffect(() => {
            // Fetch logged-in username after the component is mounted
            TeacherRegisterService.getLoggedInUsername()
                .then(response => {
                    console.log("Logged-in username:", response.data); 
                    setUsername(response.data);  // Assuming the API returns the username in the response
                    localStorage.setItem('teacherUsername', response.data); // ✅ Save to localStorage
                })
                .catch(error => {
                    console.error("Error fetching username:", error);
                    alert("Error fetching username!");
                });
        }, []);

        const updateAvailability = useCallback((e) => {
          e.preventDefault();
          if (username) navigate(`/updateAvailability/${username}`);
        }, [username, navigate]);

        const viewAppointment = useCallback((e) => {
          e.preventDefault();
          if (username) navigate(`/viewAppointment/${username}`);
        }, [username, navigate]);
    
    


  return (
    <>
    <div class="container">
    <div class="head"><h1 class="user">Welcome, {username ? username : "Loading..."}</h1></div>
    </div>
    <div class="teacherwork">
    <a onClick={(e)=> updateAvailability(e,username)}>Update Availabilty</a>
    <a onClick={(e)=> viewAppointment(e,username)}>View All Appointments</a>
    </div>
    <div class="adminwork">
    <div class="input"><button onClick={() => navigate("/teacherLogout")}>Logout</button></div>
    </div>
    </>
  )
}

export default TeacherDashboard