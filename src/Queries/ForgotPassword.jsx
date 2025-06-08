import axios from "axios";

export const ForgotPassword = ({email}) => {
    const response = axios.post('http://127.0.0.1:8000/api/users/password/email',{
        email
    });
    return response
}

