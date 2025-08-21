import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSessionService from '../../services/AdminService/AdminSessionService';
import './Admin.css'; // <-- Ensure this CSS file is created

const Login = () => {
  const [admin, registerAdmin] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    registerAdmin({ ...admin, [e.target.name]: value });
  };

  const reset = (e) => {
    e.preventDefault();
    registerAdmin({
      username: '',
      password: '',
    });
  };

  const login = (e) => {
    e.preventDefault();
    AdminSessionService.login(admin)
      .then((response) => {
        console.log('logged in', response);
        alert('Admin logged in successfully. Welcome to Admin Dashboard');
        navigate('/adminDashboard');
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
    <div className="admin-login-container">
      <header className="admin-header">
        <h1>AI-Based Student-Teacher Appointment System</h1>
      </header>

      <div className="login-box">
        <h2>Admin Login</h2>
        <input
          type="text"
          name="username"
          value={admin.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={admin.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <div className="login-actions">
          <button onClick={login}>Login</button>
          <button onClick={reset}>Clear</button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>

        <div className="register-section">
          <p>Don't have an admin account?</p>
          <button onClick={() => navigate('/sAdmin')}>Register as Admin</button>
        </div>
      </div>

      <footer className="admin-footer">
        <p>&copy; 2025 Student-Teacher Appointment System | All rights reserved</p>
      </footer>
    </div>
  );
};

export default Login;
