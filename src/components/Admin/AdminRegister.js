import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSessionService from '../../services/AdminService/AdminSessionService';
import './AdminRegister.css'; // ← Create this file

const AdminRegister = () => {
  const [admin, registerAdmin] = useState({
    username: '',
    name: '',
    mail: '',
    phone: '',
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
      name: '',
      mail: '',
      phone: '',
      password: '',
    });
  };

  const saveAdmin = (e) => {
    e.preventDefault();
    AdminSessionService.saveAdmin(admin)
      .then((response) => {
        console.log('saved', response);
        alert('Details Saved! Verify your Mail.');
        navigate('/adminVerify');
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
    <div className="admin-register-container">
      <header className="admin-header">
        <h1>AI-Based Appointment System</h1>
        <h2>Admin Registration</h2>
      </header>

      <div className="register-box">
        <input
          type="text"
          name="username"
          value={admin.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="text"
          name="name"
          value={admin.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="mail"
          value={admin.mail}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="number"
          name="phone"
          value={admin.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          type="password"
          name="password"
          value={admin.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <div className="register-actions">
          <button onClick={saveAdmin}>Next</button>
          <button onClick={reset}>Clear</button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </div>

      <footer className="admin-footer">
        <p>&copy; 2025 Student-Teacher Appointment System | All rights reserved</p>
      </footer>
    </div>
  );
};

export default AdminRegister;
