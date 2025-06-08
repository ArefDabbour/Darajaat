import axios from 'axios'

export const LoginQuery = ({ email, password }) => {
    const response = axios.post('http://127.0.0.1:8000/api/users/login', { email, password });
    return response
}
