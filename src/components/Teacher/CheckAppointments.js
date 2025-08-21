import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TeacherRegisterService from '../../services/TeacherService/TeacherRegisterService';
import './CheckAppointments.css';

const CheckAppointments = () => {
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const [username, setUsername] = useState("");
    const { username: paramUsername } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await TeacherRegisterService.getAppointments(paramUsername);
                setAppointments(response.data || []);
                setUsername(paramUsername);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
            setLoading(false);
        };
        if (paramUsername) fetchData();
    }, [paramUsername]);

    const handleStatusChange = async (appointmentId, status) => {
        try {
            await TeacherRegisterService.updateAppointmentStatus({ appointmentId, status });
            alert("Status updated successfully!");
            setAppointments(prev =>
                prev.map(app =>
                    app.id === appointmentId ? { ...app, status } : app
                )
            );
        } catch (error) {
            console.error("Error updating appointment status:", error);
            alert("Failed to update status.");
        }
    };

    return (
        <div className="check-appointments-container">

            {/* Header */}
            <header className="dashboard-topbar">
                <button className="logout-btn-top" onClick={() => navigate("/teacherLogout")}>Logout</button>
                <h2 className="project-name">Teacher Management System</h2>
                <span className="welcome-username">Welcome, {username || "Loading..."}</span>
            </header>

            {/* Portal Heading */}
            <div className="portal-heading">
                <h1>Teacher Portal - Appointments</h1>
            </div>

            {/* Table */}
            <div className="table-container">
                <table>
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
                            <th>Edit</th>
                        </tr>
                    </thead>
                    {!loading && (
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.id}</td>
                                    <td>{appointment.teacherName}</td>
                                    <td>{appointment.studentName}</td>
                                    <td>{new Date(appointment.startTime).toLocaleDateString()}</td>
                                    <td>{new Date(appointment.startTime).toLocaleTimeString()}</td>
                                    <td>{new Date(appointment.endTime).toLocaleTimeString()}</td>
                                    <td>{appointment.message}</td>
                                    <td>{appointment.status}</td>
                                    <td className="action-buttons">
                                        <button className="approve-btn" onClick={() => handleStatusChange(appointment.id, 'approved')}>Approve</button>
                                        <button className="decline-btn" onClick={() => handleStatusChange(appointment.id, 'declined')}>Decline</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>

            {/* Footer / Navigation */}
            <div className="footer-buttons">
                <button onClick={() => navigate("/teacherDashboard")}>Back</button>
            </div>

            {/* Footer */}
            <footer className="dashboard-footer">
                <p>© 2025 Teacher Management System. All rights reserved.</p>
                <p>Contact: support@teacherportal.com | Phone: +91 1234567890</p>
            </footer>
        </div>
    );
};

export default CheckAppointments;
