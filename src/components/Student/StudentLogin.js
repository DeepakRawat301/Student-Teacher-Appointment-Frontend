import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentServices from '../../services/StudentService/StudentServices';
import './Student.css'; // External CSS

const StudentLogin = () => {
  const [student, setStudent] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setStudent({ ...student, [e.target.name]: value });
  };

  const reset = (e) => {
    e.preventDefault();
    setStudent({ username: '', password: '' });
  };

  const login = (e) => {
    e.preventDefault();
    StudentServices.login(student)
      .then((response) => {
        console.log('logged in', response);
        alert('Student logged in successfully. Welcome to Student Dashboard');
        navigate('/studentDashboard');
      })
      .catch((error) => {
        if (error.response) {
          alert('Error: ' + error.response.data);
        } else if (error.request) {
          alert('No response from server.');
        } else {
          alert('Error: ' + error.message);
        }
      });
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="student-login-container">
        <header className="student-header">
          <h1>AI-Driven Appointment Booking System</h1>
          <h2>Student Login</h2>
        </header>

        <div className="student-login-form">
          <input
            type="text"
            name="username"
            value={student.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            value={student.password}
            onChange={handleChange}
            placeholder="Password"
          />

          <div className="student-login-buttons">
            <button onClick={login}>Login</button>
            <button onClick={reset}>Clear</button>
            <button onClick={() => navigate('/')}>Cancel</button>
          </div>

          <p className="student-register-note">
            New Student? Please contact Admin for registration.
          </p>
        </div>

        <footer className="student-footer">
          <p>&copy; 2025 AI Appointment System. All rights reserved.</p>
          <p>Developed by Deepak Singh Rawat | MCA Final Year Project</p>
        </footer>
      </div>
    </>
  );
};

export default StudentLogin;
