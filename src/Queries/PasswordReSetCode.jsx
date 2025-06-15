import axios from "axios";

export const PasswordReSetCode = async ({ code }) => {
    const response = await axios.post('http://127.0.0.1:8000/api/users/password/code-check', {
        code
    });
    return response
}