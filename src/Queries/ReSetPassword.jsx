import axios from "axios";

export const ReSetPassword =  ({ formdata }) => {
    const response =  axios.post('http://127.0.0.1:8000/api/users/password/reset', {
        code: formdata.code,
        password: formdata.password,
        password_confirmation: formdata.password_confirmation,
    });
    return response
}