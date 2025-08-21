import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentServices from '../../services/StudentService/StudentServices';
import './StudentRegister.css'; // new css file

const StudentRegister = () => {
  const [student, setStudent] = useState({
    username: '',
    name: '',
    mail: '',
    password: '',
    phone: '',
    department: '',
    course: '',
    subjects: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const reset = (e) => {
    e.preventDefault();
    setStudent({
      username: '',
      name: '',
      mail: '',
      password: '',
      phone: '',
      department: '',
      course: '',
      subjects: '',
    });
  };

  const navigate = useNavigate();

  const saveStudent = (e) => {
    e.preventDefault();

    const studentDto = {
      ...student,
      subjects: student.subjects.split(',').map((s) => s.trim()),
    };

    StudentServices.saveStudent(studentDto)
      .then((response) => {
        console.log('saved', response);
        alert('Details Saved! Verify your Mail.');
        navigate('/studentVerify');
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
          <div className="text">Student Registration Form</div>
          <div className="underline"></div>
        </div>

        <div className="inputs">
          <input type="text" name="username" value={student.username} onChange={handleChange} placeholder="Username" />
          <input type="text" name="name" value={student.name} onChange={handleChange} placeholder="Name" />
          <input type="email" name="mail" value={student.mail} onChange={handleChange} placeholder="Mail" />
          <input type="password" name="password" value={student.password} onChange={handleChange} placeholder="Password" />
          <input type="number" name="phone" value={student.phone} onChange={handleChange} placeholder="Phone" />
          <input type="text" name="department" value={student.department} onChange={handleChange} placeholder="Department" />
          <input type="text" name="course" value={student.course} onChange={handleChange} placeholder="Course" />
          <input
            type="text"
            name="subjects"
            value={student.subjects}
            onChange={handleChange}
            placeholder="Enter Multiple Subjects Separated By Comma"
          />
        </div>

        <div className="buttons">
          <button className="btn save" onClick={saveStudent}>Next</button>
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

export default StudentRegister;
