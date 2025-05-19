import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherRegisterService from '../../services/TeacherService/TeacherRegisterService';

const TeacherLogout = () => {

    const navigate = useNavigate();

    useEffect(() => {
      TeacherRegisterService.logout()
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

export default TeacherLogout