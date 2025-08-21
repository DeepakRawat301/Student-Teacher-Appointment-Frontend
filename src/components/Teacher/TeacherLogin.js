import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherRegisterService from '../../services/TeacherService/TeacherRegisterService';
import './Teacher.css'; // Make sure the path is correct

const TeacherLogin = () => {
  const [teacher, setTeacher] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setTeacher({ ...teacher, [e.target.name]: value });
  };

  const reset = (e) => {
    e.preventDefault();
    setTeacher({ username: '', password: '' });
  };

  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    TeacherRegisterService.login(teacher)
      .then((response) => {
        console.log('logged in', response);
        alert('Teacher logged in successfully. Welcome to Teacher Dashboard');
        navigate('/teacherDashboard');
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

  return (
    <>
      <div className="teacher-container">
        <header className="teacher-header">
          <h1>AI-Driven Appointment Booking System</h1>
          <h2>Teacher Login</h2>
        </header>

        <div className="teacher-form-container">
          <input
            type="text"
            name="username"
            value={teacher.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            type="password"
            name="password"
            value={teacher.password}
            onChange={handleChange}
            placeholder="Password"
          />

          <div className="teacher-login-buttons">
            <button onClick={login}>Login</button>
            <button onClick={reset}>Clear</button>
            <button onClick={() => navigate('/')}>Cancel</button>
          </div>

          <p className="teacher-register-note">
            New Teacher? Please contact Admin for registration.
          </p>
        </div>

        <footer className="teacher-footer">
          <p>&copy; 2025 AI Appointment System. All rights reserved.</p>
          <p>Developed by Deepak Singh Rawat | MCA Final Year Project</p>
        </footer>
      </div>
    </>
  );
};

export default TeacherLogin;
