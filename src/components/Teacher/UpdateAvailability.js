import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherRegisterService from '../../services/TeacherService/TeacherRegisterService';

const UpdateAvailability = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [teacher, setTeacher] = useState({
        status: ""
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setTeacher({ ...teacher, [e.target.name]: value });
    };

    // First get the username from session
    useEffect(() => {
        TeacherRegisterService.getLoggedInUsername()
            .then(response => {
                const loggedInUsername = response.data;
                setUsername(loggedInUsername);

                // Fetch teacher details using that username
                return TeacherRegisterService.getTeacherByUsername(loggedInUsername);
            })
            .then(response => {
                setTeacher(response.data);
            })
            .catch(error => {
                console.log("Error fetching data:", error);
            });
    }, []);

    const updateStatus = (e) => {
        e.preventDefault();
        TeacherRegisterService.updateTeacherStatus(teacher, username)
            .then(response => {
                console.log("saved", response);
                alert("Availability Updated Successfully.");
                navigate("/teacherDashboard");
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <>
            <div className='container'>
                <div className='header'>
                    <div className='text'>Update Availability</div>
                    <div className='underline'></div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <select name="status" value={teacher.status} onChange={handleChange}>
                            <option value="true">Available</option>
                            <option value="false">Not Available</option>
                        </select>
                    </div>
                </div>
                <div className='submit'>
                    <div className='submit'><button onClick={updateStatus}>Update</button></div>
                    <div className='submit'><button onClick={() => navigate("/teacherDashboard")}>Cancel</button></div>
                </div>
            </div>
            <div class="input"><button onClick={() => navigate("/teacherLogout")}>Logout</button></div>
        </>
    );
};

export default UpdateAvailability;
