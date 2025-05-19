import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSessionService from '../../services/AdminService/AdminSessionService';

const AdminLogout = () => {

    const navigate = useNavigate();

    useEffect(() => {
      AdminSessionService.logout()
          .then(response => {
              console.log("Logged out successfully:", response);
              navigate("/login");
          })
          .catch(error => {
              console.error("Error logging out:", error);
              alert("Error logging out.");
          });
  }, []);

  return (
    <></>
  )
}

export default AdminLogout