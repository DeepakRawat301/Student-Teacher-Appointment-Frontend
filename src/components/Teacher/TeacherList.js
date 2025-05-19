import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';     
import TeacherRegisterService from '../../services/TeacherService/TeacherRegisterService';

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
            setTeacher((prevElement) => {
             return  prevElement.filter((teacher) => teacher.username !== username);
            })
           }
          })
};


const editTeacher = (e,username) => {
    e.preventDefault();
    navigate(`/editTeacher/${username}`)
};


  return (
    <>
        <div class='teacherlist'>
      <h2>All Teacher Details</h2>
    </div>

    <div class='table'>
      <table>
        <thead>
        <tr>
          <th>Username</th>
          <th>Name</th>
          <th>Mail</th>
          <th>Phone</th>
          <th>Department</th>
          <th>Subjects</th>
          </tr>
        </thead>
        {!loading && (
        <tbody>
         {teachers.map((teacher)=>(
        <tr key={teacher.username}>
        <td>{teacher.username}</td>
        <td>{teacher.name}</td>
        <td>{teacher.mail}</td>
        <td>{teacher.phone}</td>
        <td>{teacher.department}</td>
        <td>{teacher.subjects}</td>
          <td>
            <a onClick={(e,id)=> editTeacher(e, teacher.username)}>Edit</a>
            <a onClick={(e,id)=> deleteTeacher(e, teacher.username)}>Delete</a>
          </td>
          </tr>
        ))}
        </tbody>
        )}
      </table>
    </div>
    </>
  )
}

export default TeacherList