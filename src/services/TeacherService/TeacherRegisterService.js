import axios from 'axios'

const Login_API="http://localhost:8080/login"

const USERNAME_API = "http://localhost:8080/api/username";

const LOGOUT_API = "http://localhost:8080/api/logout";

const Teacher_Register_API="http://localhost:8080/user/teacher/signup"

const Teacher_Verification_API="http://localhost:8080/user/teacher/verify"

const Teacher_List_API="http://localhost:8080/user/teacher/all"

const Edit_Teacher_API="http://localhost:8080/user/teacher/update"

const Teacher_ByUSername_API="http://localhost:8080/user/teacher/searchByUsername"

const Delete_Teacher_API="http://localhost:8080/user/teacher/delete"

const Available_Teacher_List_API="http://localhost:8080/student/teacher/all"

const Update_Teacher_Status_API="http://localhost:8080/teacher/updateAvailability"

const Appointment_Lists_API="http://localhost:8080/teacher/appointments"

const Appointment_Update_API="http://localhost:8080/teacher/actionOnAppointment"


class TeacherRegisterService{

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

    saveTeacher(teacher){
        return axios.post(Teacher_Register_API,teacher,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });
    }

    verificationTeacher(teacher){
        return axios.post(Teacher_Verification_API,teacher,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });
    }

    getTeacherByUsername(username) {
        return axios.get(`${Teacher_ByUSername_API}?username=${encodeURIComponent(username)}`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        });

    }

    updateTeacherByUsername(teacher, username) {
        return axios.put(`${Edit_Teacher_API}/${username}`, teacher, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }



    updateTeacherStatus(teacher, username) {
        const available = teacher.status === "true"; // convert string to boolean
        return axios.put(`${Update_Teacher_Status_API}/${username}?available=${available}`, teacher, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    
    

    deleteTeacherByUsername(username) {
        return axios.delete(`${Delete_Teacher_API}/${encodeURIComponent(username)}`, {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    

    getTeacher(){
        return axios.get(Teacher_List_API,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });

    }

  getAppointments(username) {
    return axios.get(`${Appointment_Lists_API}?username=${encodeURIComponent(username)}`, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    });
}


     updateAppointmentStatus(data) {
    return axios.put(Appointment_Update_API, data, {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json"
        }
    });
}



    getAvailableTeacher(){
        return axios.get(Available_Teacher_List_API,{
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });

    }


}

export default new TeacherRegisterService();