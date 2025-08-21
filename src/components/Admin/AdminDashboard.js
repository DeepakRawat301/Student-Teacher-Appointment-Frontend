import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSessionService from '../../services/AdminService/AdminSessionService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    AdminSessionService.getLoggedInUsername()
      .then(response => {
        setUsername(response.data);
      })
      .catch(error => {
        console.error("Error fetching username:", error);
        alert("Error fetching username!");
      });
  }, []);

  const update = useCallback((e) => {
    e.preventDefault();
    if (username) navigate(`/updateAdmin/${username}`);
  }, [username, navigate]);

  const deleteAdmin = (e) => {
    e.preventDefault();
    AdminSessionService.deleteAdminByUsername()
      .then((response) => {
        console.log("deleted", response);
        alert("Admin Deleted Successfully.");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to delete admin");
      });
  };

  return (
    <div className="admin-dashboard-container">
      {/* Header */}
      <header className="admin-dashboard-header">
        <div className="header-left">Welcome, {username || "Loading..."}</div>
        <div className="header-center">Student-Teacher Appointment Portal</div>
        <div className="header-right">
          <button onClick={update}>Update</button>
          <button onClick={deleteAdmin}>Delete</button>
          <button onClick={() => navigate("/logout")}>Logout</button>
        </div>
      </header>

      {/* Body */}
      <main className="admin-dashboard-body">
        {/* About */}
        <section className="dashboard-intro">
          <h2>About This Portal</h2>
          <p>
            This system allows students to easily book appointments with teachers based on their course and subjects. 
            Admins can efficiently manage teachers and students from this dashboard.
          </p>
        </section>

        {/* Teacher Management */}
        <section className="teacher-section">
          <h3>Teacher Management</h3>
          <p>Manage teachers, add new faculty, and view all registered teachers.</p>
          <div className="section-links">
            <a onClick={() => navigate("/addTeacher")} className="link-btn">Add New Teacher</a>
            <a onClick={() => navigate("/allTeacher")} className="link-btn">View All Teachers</a>
          </div>
        </section>

        {/* Student Management */}
        <section className="student-section">
          <h3>Student Management</h3>
          <p>Manage student records, add new students, and view all enrolled students.</p>
          <div className="section-links">
            <a onClick={() => navigate("/addStudent")} className="link-btn">Add New Student</a>
            <a onClick={() => navigate("/allStudent")} className="link-btn">View All Students</a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="admin-dashboard-footer">
        <p>&copy; 2025 Student-Teacher Appointment System | Developed with ❤️</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
