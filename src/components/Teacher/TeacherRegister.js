import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherRegisterService from '../../services/TeacherService/TeacherRegisterService';
import './TeacherRegister.css'; // new css file

const TeacherRegister = () => {
  const [teacher, setTeacher] = useState({
    username: '',
    name: '',
    mail: '',
    password: '',
    phone: '',
    department: '',
    subjects: '',
    available: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTeacher({
      ...teacher,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const reset = (e) => {
    e.preventDefault();
    setTeacher({
      username: '',
      name: '',
      mail: '',
      password: '',
      phone: '',
      department: '',
      subjects: '',
      available: false,
    });
  };

  const navigate = useNavigate();

  const saveTeacher = (e) => {
    e.preventDefault();

    const teacherDto = {
      ...teacher,
      subjects: teacher.subjects.split(',').map((s) => s.trim()),
    };

    TeacherRegisterService.saveTeacher(teacherDto)
      .then((response) => {
        console.log('saved', response);
        alert('Details Saved! Verify your Mail.');
        navigate('/teacherVerify');
      })
      .catch((error) => {
        if (error.response) {
          console.log('Backend responded with error:');
          console.log('Status:', error.response.status);
          console.log('Data:', error.response.data);
          alert('Error: ' + error.response.data);
        } else if (error.request) {
          console.log('No response received. Request was:', error.request);
          alert('No response from server.');
        } else {
          console.log('Error in setting up request:', error.message);
          alert('Error: ' + error.message);
        }
      });
  };

  return (
    <div className="register-container">
      <div className="form-box">
        <div className="header">
          <div className="text">Teacher Registration Form</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <input type="text" name="username" value={teacher.username} onChange={handleChange} placeholder="Username" />
          <input type="text" name="name" value={teacher.name} onChange={handleChange} placeholder="Name" />
          <input type="email" name="mail" value={teacher.mail} onChange={handleChange} placeholder="Mail" />
          <input type="password" name="password" value={teacher.password} onChange={handleChange} placeholder="Password" />
          <input type="number" name="phone" value={teacher.phone} onChange={handleChange} placeholder="Phone" />
          <input type="text" name="department" value={teacher.department} onChange={handleChange} placeholder="Department" />
          <input
            type="text"
            name="subjects"
            value={teacher.subjects}
            onChange={handleChange}
            placeholder="Enter Multiple Subjects Separated By Comma"
          />

          <label className="checkbox-label">
            <input type="checkbox" name="available" checked={teacher.available} onChange={handleChange} />
            Available
          </label>
        </div>

        <div className="buttons">
          <button className="btn save" onClick={saveTeacher}>Next</button>
          <button className="btn clear" onClick={reset}>Clear</button>
          <button className="btn cancel" onClick={() => navigate('/adminDashboard')}>Cancel</button>
        </div>

        <div className="logout">
          <button className="btn logout" onClick={() => navigate('/logout')}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default TeacherRegister;
