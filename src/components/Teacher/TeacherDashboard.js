import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherRegisterService from '../../services/TeacherService/TeacherRegisterService';
import './TeacherDashboard.css';

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        TeacherRegisterService.getLoggedInUsername()
            .then(response => {
                setUsername(response.data);
                localStorage.setItem('teacherUsername', response.data);
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
        <div className="teacher-dashboard-container">

            {/* Top Header */}
            <header className="dashboard-topbar">
            <span className="welcome-username">Welcome, {username || "Loading..."}</span>
            <h2 className="project-name">Teacher Management System</h2>
            <button className="logout-btn-top" onClick={() => navigate("/teacherLogout")}>Logout</button>
            </header>


            {/* Portal Heading */}
            <div className="portal-heading">
                <h1>Teacher Portal</h1>
            </div>

            {/* Action Cards */}
            <div className="teacher-actions-cards">

                {/* Update Availability Card */}
                <div className="action-card" onClick={(e) => updateAvailability(e)}>
                    <h3>Update Availability</h3>
                    <p>Set your availability status so that students can see when you are available for appointments.</p>
                    <button>Go</button>
                </div>

                {/* View Appointments Card */}
                <div className="action-card" onClick={(e) => viewAppointment(e)}>
                    <h3>View Appointments</h3>
                    <p>Check all scheduled appointments with students and manage their status efficiently.</p>
                    <button>Go</button>
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

export default TeacherDashboard;
