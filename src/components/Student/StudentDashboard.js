import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentServices from '../../services/StudentService/StudentServices';
import './StudentDashboard.css';

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        StudentServices.getLoggedInUsername()
            .then(response => {
                const fetchedUsername = response.data;
                setUsername(fetchedUsername);
                localStorage.setItem("studentUsername", fetchedUsername);
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
        <div className="student-dashboard-container">
            
            {/* Top Header */}
            <header className="dashboard-topbar">
                <span className="welcome-username">Welcome, {username || "Loading..."}</span>
                <h2 className="project-name">Student Management System</h2>
                <button className="logout-btn-top" onClick={() => navigate("/studentLogout")}>Logout</button>
            </header>

            {/* Portal Heading */}
            <div className="portal-heading">
                <h1>Student Portal</h1>
            </div>

            {/* Body Cards */}
            <div className="dashboard-cards">
                <div className="dashboard-card" onClick={() => navigate("/allAvailableTeacher")}>
                    <h2>View All Available Teachers</h2>
                    <p>Check all teachers currently available for appointments</p>
                </div>

                <div className="dashboard-card" onClick={checkAppointment}>
                    <h2>View Appointment Status</h2>
                    <p>See the status of your booked appointments</p>
                </div>
            </div>

            {/* Footer */}
            <footer className="dashboard-footer">
                <p>© 2025 Student Management System. All rights reserved.</p>
                <p>Contact: support@studentportal.com | Phone: +91 1234567890</p>
            </footer>
        </div>
    );
}

export default StudentDashboard;
