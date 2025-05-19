import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Admin/AdminLogin';
import StudentLogin from './components/Student/StudentLogin';
import TeacherLogin from './components/Teacher/TeacherLogin';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import AdminRegister from './components/Admin/AdminRegister';
import AdminVerify from './components/Admin/AdminVerify';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLogout from './components/Admin/AdminLogout';
import AdminUpdate from './components/Admin/AdminUpdate';
import TeacherRegister from './components/Teacher/TeacherRegister';
import StudentRegister from './components/Student/StudentRegister';
import TeacherVerify from './components/Teacher/TeacherVerify';
import StudentVerify from './components/Student/StudentVerify';
import TeacherList from './components/Teacher/TeacherList';
import UpdateTeacher from './components/Teacher/UpdateTeacher';
import StudentList from './components/Student/StudentList';
import UpdateStudent from './components/Student/UpdateStudent';
import StudentLogout from './components/Student/StudentLogout';
import StudentDashboard from './components/Student/StudentDashboard';
import TeacherLogout from './components/Teacher/TeacherLogout';
import TeacherDashboard from './components/Teacher/TeacherDashboard';
import AvailableTeacher from './components/Teacher/AvailableTeacher';
import UpdateAvailability from './components/Teacher/UpdateAvailability';
import CheckAppointments from './components/Teacher/CheckAppointments';

import CheckUpdateOnAppointments from './components/Student/CheckUpdateOnAppointments';



function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/studentlogin" element={<StudentLogin/>}/>
      <Route path="/teacherlogin" element={<TeacherLogin/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/sAdmin" element={<AdminRegister/>}/>
      <Route path="/adminVerify" element={<AdminVerify/>}/>
      <Route path="/adminDashboard" element={<AdminDashboard/>}/>
      <Route path="/logout" element={<AdminLogout/>}/>
      <Route path="/updateAdmin/:username" element={<AdminUpdate/>}/>
      <Route path="/addTeacher" element={<TeacherRegister/>}/>
      <Route path="/addStudent" element={<StudentRegister/>}/>
      <Route path="/teacherVerify" element={<TeacherVerify/>}/>
      <Route path="/studentVerify" element={<StudentVerify/>}/>
      <Route path="/allTeacher" element={<TeacherList/>}/>
      <Route path="/editTeacher/:username" element={<UpdateTeacher/>}/>
      <Route path="/allStudent" element={<StudentList/>}/>
      <Route path="/editStudent/:username" element={<UpdateStudent/>}/>
      <Route path="/teacherDashboard" element={<TeacherDashboard/>}/>
      <Route path="/teacherLogout" element={<TeacherLogout/>}/>
      <Route path="/studentDashboard" element={<StudentDashboard/>}/>
      <Route path="/studentLogout" element={<StudentLogout/>}/>

      <Route path="/allAvailableTeacher" element={<AvailableTeacher/>}/>
      <Route path="/updateAvailability/:username" element={<UpdateAvailability/>}/>
      <Route path="/viewAppointment/:username" element={<CheckAppointments/>}/>

      <Route path="/checkAppointment/:username" element={<CheckUpdateOnAppointments/>}/>
      
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
