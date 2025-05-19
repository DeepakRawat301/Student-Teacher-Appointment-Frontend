import axios from 'axios'


const Login_API="http://localhost:8080/login"

const USERNAME_API = "http://localhost:8080/api/username";

const LOGOUT_API = "http://localhost:8080/api/logout";

const Student_Register_API="http://localhost:8080/user/student/signup"

const Student_Verification_API="http://localhost:8080/user/student/verify"

const Student_List_API="http://localhost:8080/user/student/all"

const Edit_Student_API="http://localhost:8080/user/student/update"

const Student_ByUSername_API="http://localhost:8080/user/student/searchByUsername"

const Delete_Student_API="http://localhost:8080/user/student/delete"

const BOOK_APPOINTMENT_API = "http://localhost:8080/student/bookAppointment";

const Appointment_Lists_API="http://localhost:8080/student/appointments"



class StudentServices{

    login(admin) {
        const formData = new URLSearchParams();
        formData.append("username", admin.username);
        formData.append("password", admin.password);

        return axios.post(Login_API, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        });
    }


    logout() {
        return axios.post(LOGOUT_API, null, { withCredentials: true });
    }

    getLoggedInUsername() {
        return axios.get(USERNAME_API, {
            withCredentials: true
        });
    }

    saveStudent(student){
        return axios.post(Student_Register_API,student,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });
    }

    verificationStudent(student){
        return axios.post(Student_Verification_API,student,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });
    }

    getStudentByUsername(username) {
        return axios.get(`${Student_ByUSername_API}?username=${encodeURIComponent(username)}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        });

    }

    updateStudentByUsername(student, username) {
        return axios.put(`${Edit_Student_API}/${username}`, student, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    

    deleteStudentByUsername(username) {
        return axios.delete(`${Delete_Student_API}/${encodeURIComponent(username)}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    

    getStudent(){
        return axios.get(Student_List_API,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });

    }

    bookAppointment(appointmentData) {
        return axios.post(BOOK_APPOINTMENT_API, appointmentData, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }



    checkUpdateOnAppointment(username) {
    return axios.get(`${Appointment_Lists_API}?username=${encodeURIComponent(username)}`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    });
}

    
}

export default new StudentServices();