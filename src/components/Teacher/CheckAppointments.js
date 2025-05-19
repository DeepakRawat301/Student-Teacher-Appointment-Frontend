import React, { useEffect, useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';     
import TeacherRegisterService from '../../services/TeacherService/TeacherRegisterService';

const CheckAppointments = () => {
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const { username } = useParams();  // Get username from URL
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await TeacherRegisterService.getAppointments(username);
                setAppointments(response.data || []);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
            setLoading(false);
        };
        if (username) {
            fetchData();
        }
    }, [username]);

    const handleStatusChange = async (appointmentId, status) => {
    try {
        await TeacherRegisterService.updateAppointmentStatus({ appointmentId, status });
        alert("Status updated successfully!");
        window.location.reload(); // Optional: Better to update state instead
    } catch (error) {
        console.error("Error updating appointment status:", error);
        alert("Failed to update status.");
    }
};

    return (
        <>
            <div className="teacherlist">
                <h2>All Appointments for {username}</h2>
            </div>

            <div className="table">
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
                                    <td>
                                        <button onClick={() => handleStatusChange(appointment.id, 'approved')}>Approve</button>
                                        <button onClick={() => handleStatusChange(appointment.id, 'declined')}>Decline</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
            <div class="input"><button onClick={() => navigate("/studentLogout")}>Logout</button></div>
            <div className='submit'><button onClick={() => navigate("/teacherDashboard")}>Cancel</button></div>
        </>
    );
};

export default CheckAppointments;
