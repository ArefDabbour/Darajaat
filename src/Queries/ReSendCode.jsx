import axios from 'axios'

export const ReSendCode = async ({ email }) => {
    const token = localStorage.getItem('authToken');
    const response = await axios.post('http://127.0.0.1:8000/api/users/otp/resend', {
        email,
    },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response

}
