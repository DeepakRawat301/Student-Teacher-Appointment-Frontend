import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentServices from '../../services/StudentService/StudentServices';

const StudentDashboard = () => {

    const navigate = useNavigate();
 
    const [username, setUsername] = useState("");

    useEffect(() => {
      // Fetch logged-in username after the component is mounted
      StudentServices.getLoggedInUsername()
          .then(response => {
              const fetchedUsername = response.data;
              setUsername(fetchedUsername);
              localStorage.setItem("studentUsername", fetchedUsername); // ✅ Save to localStorage
          })
          .catch(error => {
              console.error("Error fetching username:", error);
              alert("Error fetching username!");
          });
  }, []);

  
          const checkAppointment = useCallback((e) => {
            e.preventDefault();
            if (username) navigate(`/checkAppointment/${username}`);
          }, [username, navigate]);
      

  return (
    <>
    <div class="container">
    <div class="head"><h1 class="user">Welcome, {username ? username : "Loading..."}</h1></div>
    </div>
    <div class="teacherwork">
    <a onClick={()=> navigate("/allAvailableTeacher")}>View All Available Teachers</a>
    <a onClick={(e)=> checkAppointment(e,username)}>View Appointment Status</a>
    </div>

    <div class="adminwork">
    <div class="input"><button onClick={() => navigate("/studentLogout")}>Logout</button></div>
    </div>

    </>
  )
}

export default StudentDashboard