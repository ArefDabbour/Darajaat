import axios from 'axios'

export const LoginQuery = ({ recivedEmail, recivedPassword }) => {
    const response = axios.post('http://127.0.0.1:8000/api/users/login', { 
        email : recivedEmail,
        password: recivedPassword });
    return response
}
