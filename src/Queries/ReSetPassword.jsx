import axios from "axios";

export const ReSetPassword = () => {
    const response = axios.post('http://127.0.0.1:8000/api/users/password/reset');
    return response
}