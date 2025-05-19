import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';     
import TeacherRegisterService from '../../services/TeacherService/TeacherRegisterService';
import StudentServices from '../../services/StudentService/StudentServices';


const AvailableTeacher = () => {


    const [loading, setLoading] = useState(true);
    const [teachers,setTeacher] = useState([]);
    const [studentUsername, setStudentUsername] = useState('');
    const [messages, setMessages] = useState({}); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () =>{
         setLoading(true);
         try{
           const response = await TeacherRegisterService.getAvailableTeacher();
           setTeacher(response.data || []);
         }catch(error) {
           console.log(error);
         }
         setLoading(false);
        };
        fetchData();

        const storedUsername = localStorage.getItem('studentUsername');
    if (storedUsername) {
      setStudentUsername(storedUsername);
    }
   }, []);

   const handleMessageChange = (e, username) => {
    setMessages({ ...messages, [username]: e.target.value });
  };



  const bookAppointment = async (e, teacherUsername) => {
    e.preventDefault();
  
    const message = messages[teacherUsername];
    if (!message) {
      alert('Please enter a message for the appointment.');
      return;
    }
  
    // Construct the request object with correct keys expected by backend
    const requestData = {
  username: teacherUsername,  // match backend expectation
  studentusername: studentUsername,
  message: message,
   status: "Pending"
};

  
    try {
      const response = await StudentServices.bookAppointment(requestData);
      alert('Appointment booked successfully!');
      setMessages({ ...messages, [teacherUsername]: '' }); // Clear input
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Failed to book appointment.');
    }
  };
  


  return (
    <>
    <div className="teacherlist">
        <h2>All Available Teachers</h2>
      </div>

      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Mail</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Subjects</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.username}>
                  <td>{teacher.username}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.mail}</td>
                  <td>{teacher.phone}</td>
                  <td>{teacher.department}</td>
                  <td>{teacher.subjects.join(', ')}</td>
                  <td>
                    <input
                      type="text"
                      value={messages[teacher.username] || ''}
                      onChange={(e) => handleMessageChange(e, teacher.username)}
                      placeholder="Enter message"
                    />
                  </td>
                  <td>
                    <button onClick={(e) => bookAppointment(e, teacher.username)}>
                      Book Appointment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div class="input"><button onClick={() => navigate("/studentLogout")}>Logout</button></div>
      <div class='submit'><button onClick={()=>navigate("/studentDashboard")}>Back</button></div>
    </>
    
  )
}

export default AvailableTeacher