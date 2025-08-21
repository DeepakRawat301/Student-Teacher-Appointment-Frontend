import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherRegisterService from '../../services/TeacherService/TeacherRegisterService';
import './UpdateAvailability.css';

const UpdateAvailability = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [teacher, setTeacher] = useState({ status: "" });

    const handleChange = (e) => {
        const value = e.target.value;
        setTeacher({ ...teacher, [e.target.name]: value });
    };

    useEffect(() => {
        TeacherRegisterService.getLoggedInUsername()
            .then(response => {
                const loggedInUsername = response.data;
                setUsername(loggedInUsername);
                return TeacherRegisterService.getTeacherByUsername(loggedInUsername);
            })
            .then(response => {
                setTeacher(response.data);
            })
            .catch(error => {
                console.log("Error fetching data:", error);
            });
    }, []);

    const updateStatus = (e) => {
        e.preventDefault();
        TeacherRegisterService.updateTeacherStatus(teacher, username)
            .then(response => {
                alert("Availability Updated Successfully.");
                navigate("/teacherDashboard");
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="update-availability-container">

            {/* Top Header */}
            <header className="dashboard-topbar">
                <span className="welcome-username">Welcome, {username || "Loading..."}</span>
                <h2 className="project-name">Teacher Management System</h2>
                <button className="logout-btn-top" onClick={() => navigate("/teacherLogout")}>Logout</button>
            </header>

            {/* Portal Heading */}
            <div className="portal-heading">
                <h1>Teacher Portal - Update Availability</h1>
            </div>

            {/* Update Form */}
            <div className="form-container">
                <select name="status" value={teacher.status} onChange={handleChange}>
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>

                <div className="form-buttons">
                    <button onClick={updateStatus}>Update</button>
                    <button onClick={() => navigate("/teacherDashboard")}>Cancel</button>
                </div>
            </div>

            {/* Footer */}
            <footer className="dashboard-footer">
                <p>© 2025 Teacher Management System. All rights reserved.</p>
                <p>Contact: support@teacherportal.com | Phone: +91 1234567890</p>
            </footer>
        </div>
    );
};

export default UpdateAvailability;
