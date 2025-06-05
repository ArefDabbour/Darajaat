import axios from 'axios'

export const VerifyOtp = async ({ email, otp_code }) => {
    const token = localStorage.getItem('authToken');
    const response = await axios.post('http://127.0.0.1:8000/api/users/otp/verify', {
        email,
        otp_code
    },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response
}
