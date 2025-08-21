import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentServices from '../../services/StudentService/StudentServices';
import './StudentList.css'; // External CSS file

const StudentList = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await StudentServices.getStudent();
        setStudent(response.data || []);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteStudent = (e, username) => {
    e.preventDefault();
    StudentServices.deleteStudentByUsername(username).then(() => {
      if (students) {
        alert('Data Deleted Successfully.');
        setStudent((prevElement) =>
          prevElement.filter((student) => student.username !== username)
        );
      }
    });
  };

  const editStudent = (e, username) => {
    e.preventDefault();
    navigate(`/editStudent/${username}`);
  };

  return (
    <div className="student-list-container">
      <h2>All Students Details</h2>

      <div className="student-table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Mail</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Course</th>
              <th>Subjects</th>
              <th>Actions</th>
            </tr>
          </thead>

          {!loading && (
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={student.username}
                  className={index % 2 === 0 ? 'even-row' : 'odd-row'}
                >
                  <td>{student.username}</td>
                  <td>{student.name}</td>
                  <td>{student.mail}</td>
                  <td>{student.phone}</td>
                  <td>{student.department}</td>
                  <td>{student.course}</td>
                  <td>
                    {Array.isArray(student.subjects)
                      ? student.subjects.join(', ')
                      : student.subjects}
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={(e) => editStudent(e, student.username)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={(e) => deleteStudent(e, student.username)}
                    >
                      Delete
                    </button>
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

export default StudentList;
