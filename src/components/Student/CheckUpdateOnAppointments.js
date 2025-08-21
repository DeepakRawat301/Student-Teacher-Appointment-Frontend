import React, { useEffect, useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';    
import StudentServices from '../../services/StudentService/StudentServices';
import './CheckUpdateOnAppointments.css';

const CheckUpdateOnAppointments = () => {
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const { username } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await StudentServices.checkUpdateOnAppointment(username);
                setAppointments(response.data || []);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
            setLoading(false);
        };
        if (username) fetchData();
    }, [username]);

    return (
        <div className="appointments-container">

            {/* Top Header */}
            <header className="appointments-topbar">
                <span className="welcome-username">Welcome, {username || "Loading..."}</span>
                <h2 className="project-name">Student Management System</h2>
                <button className="logout-btn-top" onClick={() => navigate("/studentLogout")}>Logout</button>
            </header>

            {/* Portal Heading */}
            <div className="portal-heading">
                <h1>Appointments Portal</h1>
                <h3>All Appointments for {username}</h3>
            </div>

            {/* Table */}
            <div className="table-wrapper">
                <table className="appointments-table">
                    <thead>
                        <tr>
                            <th>Appointment ID</th>
                            <th>Teacher Name</th>
                            <th>Student Name</th>
                            <th>Date</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Message</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {!loading && (
                        <tbody>
                            {appointments.map((appointment, index) => (
                                <tr key={index}>
                                    <td>{appointment.id}</td>
                                    <td>{appointment.teacherName}</td>
                                    <td>{appointment.studentName}</td>
                                    <td>{new Date(appointment.startTime).toLocaleDateString()}</td>
                                    <td>{new Date(appointment.startTime).toLocaleTimeString()}</td>
                                    <td>{new Date(appointment.endTime).toLocaleTimeString()}</td>
                                    <td>{appointment.message}</td>
                                    <td>{appointment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>

            {/* Navigation Buttons */}
            <div className="dashboard-actions">
                <button onClick={() => navigate("/studentDashboard")}>Back</button>
            </div>

            {/* Footer */}
            <footer className="dashboard-footer">
                <p>© 2025 Student Management System. All rights reserved.</p>
                <p>Contact: support@studentportal.com | Phone: +91 1234567890</p>
            </footer>
        </div>
    );
};

export default CheckUpdateOnAppointments;
