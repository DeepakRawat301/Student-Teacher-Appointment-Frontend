import axios from 'axios';

const BASE_URL = "https://student-teacher-appointment-backend.onrender.com";

const Login_API = `${BASE_URL}/login`;
const USERNAME_API = `${BASE_URL}/api/username`;
const LOGOUT_API = `${BASE_URL}/api/logout`;
const Get_Admin_API = `${BASE_URL}/user/admin/searchByUsername`;
const Admin_Update_API = `${BASE_URL}/user/admin/update`;
const Admin_Delete_API = `${BASE_URL}/user/admin/delete`;
const Admin_Register_API = `${BASE_URL}/public/signup`;
const Admin_Verification_API = `${BASE_URL}/public/verify`;

class AdminSessionService {

    saveAdmin(admin){
        return axios.post(Admin_Register_API, admin, {
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });
    }

    verificationAdmin(admin){
        return axios.post(Admin_Verification_API, admin, {
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });
    }

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
        return axios.get(USERNAME_API, { withCredentials: true });
    }

    getAdminByUsername(username) {
        return axios.get(Get_Admin_API + "?username=" + username, { withCredentials:true });
    }
    
    updateAdminByUsername(admin, username) {
        return axios.put(Admin_Update_API, admin, { withCredentials: true });
    }

    deleteAdminByUsername() {
        return axios.delete(Admin_Delete_API, { withCredentials: true });
    }
    
}

export default new AdminSessionService();
 
