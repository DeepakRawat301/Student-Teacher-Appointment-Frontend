import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TeacherRegisterService from '../../services/TeacherService/TeacherRegisterService';
import './UpdateTeacher.css'; // Add this CSS file

const UpdateTeacher = () => {
    const {username} = useParams();
    const navigate = useNavigate();

    const [teacher, setTeacher] = useState({
        username: "",
        name: "",
        mail: "",
        phone: "",
        department: "",
        subjects: [],
    });

    const [subjectsString, setSubjectsString] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setTeacher({...teacher, [e.target.name]: value});
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TeacherRegisterService.getTeacherByUsername(username);
                setTeacher(response.data);
                setSubjectsString(response.data.subjects.join(', '));
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [username]);

    const updateTeacher = (e) => {
        e.preventDefault();
        const updatedTeacher = {
            ...teacher,
            subjects: subjectsString.split(',').map(sub => sub.trim())
        };

        TeacherRegisterService.updateTeacherByUsername(updatedTeacher, teacher.username)
            .then((response) => {
                alert("Data Updated Successfully.");
                navigate("/allTeacher");
            })
            .catch((error) => {
                console.log(error);
                alert("Update failed. Please check the data and try again.");
            });
    };

    return (
        <div className="update-teacher-container">
            <div className="form-header">
                <h2>Update Teacher</h2>
                <div className="underline"></div>
            </div>

            <form className="update-teacher-form">
                <input type="text" name="username" value={teacher.username} onChange={handleChange} placeholder='Username'/>
                <input type="text" name="name" value={teacher.name} onChange={handleChange} placeholder='Name'/>
                <input type="email" name="mail" value={teacher.mail} onChange={handleChange} placeholder='Mail'/>
                <input type="number" name="phone" value={teacher.phone} onChange={handleChange} placeholder='Phone'/>
                <input type="text" name="department" value={teacher.department} onChange={handleChange} placeholder='Department'/>
                <input type="text" value={subjectsString} onChange={(e) => setSubjectsString(e.target.value)} placeholder="Subjects (comma separated)"/>

                <div className="form-buttons">
                    <button type="submit" onClick={updateTeacher} className="update-btn">Update</button>
                    <button type="button" onClick={() => navigate("/adminDashboard")} className="cancel-btn">Cancel</button>
                    <button type="button" onClick={() => navigate("/logout")} className="logout-btn">Logout</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateTeacher;
