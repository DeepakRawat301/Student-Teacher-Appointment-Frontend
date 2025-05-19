import React, { useEffect, useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';    
import StudentServices from '../../services/StudentService/StudentServices';

const CheckUpdateOnAppointments = () => {

    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const { username } = useParams();  // Get username from URL
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
        if (username) {
            fetchData();
        }
    }, [username]);



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
            <div class="input"><button onClick={() => navigate("/studentLogout")}>Logout</button></div>
            <div class='submit'><button onClick={()=>navigate("/studentDashboard")}>Back</button></div>
    </>
  )
}

export default CheckUpdateOnAppointments