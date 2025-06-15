import axios from "axios";

export const LogOut = () => {
    const response = axios.get('http://127.0.0.1:8000/api/users/logout');
    return response;
}