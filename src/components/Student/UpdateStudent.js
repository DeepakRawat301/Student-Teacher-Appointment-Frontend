import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StudentServices from '../../services/StudentService/StudentServices';
import './UpdateStudent.css'; // Add this CSS file

const UpdateStudent = () => {
    const {username} = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState({
        username: "",
        name: "",
        mail: "",
        phone: "",
        department: "",
        course: "",
        subjects: [],
    });

    const [subjectsString, setSubjectsString] = useState("");

    const handleChange = (e) => {
        setStudent({...student, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await StudentServices.getStudentByUsername(username);
                setStudent(response.data);
                setSubjectsString(response.data.subjects.join(', '));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [username]);

    const updateStudent = (e) => {
        e.preventDefault();
        const updatedStudent = {
            ...student,
            subjects: subjectsString.split(',').map(sub => sub.trim())
        };

        StudentServices.updateStudentByUsername(updatedStudent, student.username)
            .then(() => {
                alert("Data Updated Successfully.");
                navigate("/allStudent");
            })
            .catch((error) => {
                console.log(error);
                alert("Update failed. Please check the data and try again.");
            });
    };

    return (
        <div className="update-student-container">
            <div className="form-header">
                <h2>Update Student</h2>
                <div className="underline"></div>
            </div>

            <form className="update-student-form">
                <input type="text" name="username" value={student.username} onChange={handleChange} placeholder='Username'/>
                <input type="text" name="name" value={student.name} onChange={handleChange} placeholder='Name'/>
                <input type="email" name="mail" value={student.mail} onChange={handleChange} placeholder='Mail'/>
                <input type="number" name="phone" value={student.phone} onChange={handleChange} placeholder='Phone'/>
                <input type="text" name="department" value={student.department} onChange={handleChange} placeholder='Department'/>
                <input type="text" name="course" value={student.course} onChange={handleChange} placeholder='Course'/>
                <input type="text" value={subjectsString} onChange={(e) => setSubjectsString(e.target.value)} placeholder="Subjects (comma separated)"/>

                <div className="form-buttons">
                    <button type="submit" onClick={updateStudent} className="update-btn">Update</button>
                    <button type="button" onClick={() => navigate("/adminDashboard")} className="cancel-btn">Cancel</button>
                    <button type="button" onClick={() => navigate("/logout")} className="logout-btn">Logout</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateStudent;
