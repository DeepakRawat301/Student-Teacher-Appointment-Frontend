import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';     
import StudentServices from '../../services/StudentService/StudentServices';


const StudentList = () => {

    const [loading, setLoading] = useState(true);
    const [students,setStudent] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
            const fetchData = async () =>{
             setLoading(true);
             try{
               const response = await StudentServices.getStudent();
               setStudent(response.data || []);
             }catch(error) {
               console.log(error);
             }
             setLoading(false);
            };
            fetchData();
       }, []);

    const deleteStudent = (e, username) => {
        e.preventDefault();
        StudentServices.deleteStudentByUsername(username)
              .then(() => {
               if(students){
                setStudent((prevElement) => {
                  alert("Data Deleted Successfully.");
                 return  prevElement.filter((student) => student.username !== username);
                 
                })
               }
              })
    };

    const editStudent = (e,username) => {
        e.preventDefault();
        navigate(`/editStudent/${username}`)
    };


  return (
    <>
        <div class='teacherlist'>
      <h2>All Students Details</h2>
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
         {students.map((student)=>(
        <tr key={student.username}>
        <td>{student.username}</td>
        <td>{student.name}</td>
        <td>{student.mail}</td>
        <td>{student.phone}</td>
        <td>{student.department}</td>
        <td>{student.course}</td>
        <td>{student.subjects}</td>
          <td>
            <a onClick={(e,id)=> editStudent(e, student.username)}>Edit</a>
            <a onClick={(e,id)=> deleteStudent(e, student.username)}>Delete</a>
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

export default StudentList