import axios from 'axios'

export const SignUpQuery = ({ formData }) => {
    const response = axios.post('http://127.0.0.1:8000/api/users/register', formData);
    return response
}
