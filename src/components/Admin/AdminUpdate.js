import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSessionService from '../../services/AdminService/AdminSessionService';
import './AdminUpdate.css';  // <-- new CSS file

const AdminUpdate = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    username: "",
    name: "",
    mail: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setAdmin({ ...admin, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AdminSessionService.getAdminByUsername(username);
        setAdmin(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [username]);

  const updateAdmin = (e) => {
    e.preventDefault();
    AdminSessionService.updateAdminByUsername(admin, username)
      .then((response) => {
        console.log("saved", response);
        alert("Data Updated Successfully.");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="update-container">
      <div className="form-box">
        <div className="header">
          <div className="text">Update Admin</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
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
            placeholder="Mail"
          />
          <input
            type="number"
            name="phone"
            value={admin.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <input
            type="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>

        <div className="buttons">
          <button className="btn update" onClick={updateAdmin}>
            Update
          </button>
          <button className="btn cancel" onClick={() => navigate("/adminDashboard")}>
            Cancel
          </button>
        </div>

        <div className="logout">
          <button className="btn logout" onClick={() => navigate("/logout")}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdate;
