import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSessionService from '../../services/AdminService/AdminSessionService';


const AdminDashboard = () => {

  const navigate = useNavigate();
 
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Fetch logged-in username after the component is mounted
        AdminSessionService.getLoggedInUsername()
            .then(response => {
                setUsername(response.data);  // Assuming the API returns the username in the response
            })
            .catch(error => {
                console.error("Error fetching username:", error);
                alert("Error fetching username!");
            });
    }, []);

    const update = useCallback((e) => {
      e.preventDefault();
      if (username) navigate(`/updateAdmin/${username}`);
    }, [username, navigate]);


    const deleteAdmin = (e) => {
      e.preventDefault();
      AdminSessionService.deleteAdminByUsername()
        .then((response) => {
          console.log("deleted", response);
          alert("Admin Deleted Successfully.");
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to delete admin");
        });


    };
    
    
  return (
    <>
    <div class="container">
    <div class="head"><h1 class="user">Welcome, {username ? username : "Loading..."}</h1></div>
    </div>
    <div class="adminwork">
    <div class="input"><button onClick={(e)=>update(e, username)}>Update</button></div>
    <div class="input"><button onClick={(e) => deleteAdmin(e)}>Delete</button></div>
    <div class="input"><button onClick={() => navigate("/logout")}>Logout</button></div>
    </div>

    <div class="teacherwork">
    <a onClick={()=> navigate("/addTeacher")}>Add New Teacher</a>
    <a onClick={()=> navigate("/allTeacher")}>View All Teachers</a>
    </div>

    <div class="studentwork">
    <a onClick={()=> navigate("/addStudent")}>Add New Student</a>
    <a onClick={()=> navigate("/allStudent")}>View All Students</a>
    </div>
 
    </>
  )
}

export default AdminDashboard