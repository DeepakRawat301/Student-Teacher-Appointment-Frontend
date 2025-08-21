import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';     
import TeacherRegisterService from '../../services/TeacherService/TeacherRegisterService';
import StudentServices from '../../services/StudentService/StudentServices';
import './AvailableTeacher.css';

const AvailableTeacher = () => {
    const [loading, setLoading] = useState(true);
    const [teachers, setTeacher] = useState([]);
    const [studentUsername, setStudentUsername] = useState('');
    const [messages, setMessages] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await TeacherRegisterService.getAvailableTeacher();
                setTeacher(response.data || []);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();

        const storedUsername = localStorage.getItem('studentUsername');
        if (storedUsername) setStudentUsername(storedUsername);
    }, []);

    const handleMessageChange = (e, username) => {
        setMessages({ ...messages, [username]: e.target.value });
    };

    const bookAppointment = async (e, teacherUsername) => {
        e.preventDefault();
        const message = messages[teacherUsername];
        if (!message) {
            alert('Please enter a message for the appointment.');
            return;
        }

        const requestData = {
            username: teacherUsername,
            studentusername: studentUsername,
            message: message,
            status: "Pending"
        };

        try {
            await StudentServices.bookAppointment(requestData);
            alert('Appointment booked successfully!');
            setMessages({ ...messages, [teacherUsername]: '' });
        } catch (error) {
            console.error(error);
            alert(error.response?.data || 'Failed to book appointment.');
        }
    };

    return (
        <div className="available-teacher-container">
            {/* Top Header */}
            <header className="teacher-topbar">
                <span className="welcome-username">Welcome, {studentUsername || "Loading..."}</span>
                <h2 className="project-name">Student Management System</h2>
                <button className="logout-btn-top" onClick={() => navigate("/studentLogout")}>Logout</button>
            </header>

            {/* Portal Heading */}
            <div className="portal-heading">
                <h1>Available Teachers</h1>
            </div>

            {/* Table */}
            <div className="table-wrapper">
                <table className="teacher-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Mail</th>
                            <th>Phone</th>
                            <th>Department</th>
                            <th>Subjects</th>
                            <th>Message</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {!loading && (
                        <tbody>
                            {teachers.map((teacher) => (
                                <tr key={teacher.username}>
                                    <td>{teacher.username}</td>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.mail}</td>
                                    <td>{teacher.phone}</td>
                                    <td>{teacher.department}</td>
                                    <td>{teacher.subjects.join(', ')}</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={messages[teacher.username] || ''}
                                            onChange={(e) => handleMessageChange(e, teacher.username)}
                                            placeholder="Enter message"
                                        />
                                    </td>
                                    <td>
                                        <button onClick={(e) => bookAppointment(e, teacher.username)}>
                                            Book Appointment
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>

            {/* Footer / Navigation */}
            <div className="dashboard-actions">
                <button onClick={() => navigate("/studentDashboard")}>Back</button>
            </div>

            <footer className="dashboard-footer">
                <p>© 2025 Teacher Management System. All rights reserved.</p>
                <p>Contact: support@teacherportal.com | Phone: +91 1234567890</p>
            </footer>
        </div>
    )
}

export default AvailableTeacher;
