import axios from "axios";

export const ForgotPassword = async ({ email }) => {
    const response = await axios.post('http://127.0.0.1:8000/api/users/password/email', {
        email
    }, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response
}

