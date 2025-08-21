import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';     
import TeacherRegisterService from '../../services/TeacherService/TeacherRegisterService';
import './TeacherList.css'; // Add CSS file

const TeacherList = () => {
    const [loading, setLoading] = useState(true);
    const [teachers,setTeacher] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            try{
                const response = await TeacherRegisterService.getTeacher();
                setTeacher(response.data || []);
            }catch(error) {
                console.log(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const deleteTeacher = (e, username) => {
        e.preventDefault();
        TeacherRegisterService.deleteTeacherByUsername(username)
            .then(() => {
                if(teachers){
                    setTeacher(prev => prev.filter(t => t.username !== username));
                }
            });
    };

    const editTeacher = (e, username) => {
        e.preventDefault();
        navigate(`/editTeacher/${username}`);
    };

    return (
        <div className="teacher-list-container">
            <h2>All Teacher Details</h2>

            <div className="teacher-table-wrapper">
                <table className="teacher-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Mail</th>
                            <th>Phone</th>
                            <th>Department</th>
                            <th>Subjects</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {!loading && (
                        <tbody>
                            {teachers.map((teacher, index) => (
                                <tr key={teacher.username} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                    <td>{teacher.username}</td>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.mail}</td>
                                    <td>{teacher.phone}</td>
                                    <td>{teacher.department}</td>
                                    <td>{Array.isArray(teacher.subjects) ? teacher.subjects.join(', ') : teacher.subjects}</td>
                                    <td>
                                        <button className="edit-btn" onClick={(e) => editTeacher(e, teacher.username)}>Edit</button>
                                        <button className="delete-btn" onClick={(e) => deleteTeacher(e, teacher.username)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default TeacherList;
