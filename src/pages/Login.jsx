import { Link, useNavigate } from "react-router";
import './login.css';
import Logo from "../assets/logo.png"
import { MdOutlineMail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { LoginQuery } from "../Queries/LoginQuery";
import { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import { ForgotPassword } from '../Queries/ForgotPassword'
import { ReSetPassword } from '../Queries/ReSetPassword'
import { PasswordReSetCode } from '../Queries/PasswordReSetCode'
import ErrorComponent from "../components/ErrorComponent";

export default function Login() {
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userName, setUserName] = useState('');
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [requestError, setRequestError] = useState({});

    const navigator = useNavigate();

    const loginQuery = useMutation({
        mutationFn: LoginQuery,
        onMutate: () => { setIsSubmitting(true) },
        onSuccess: (data) => {
            setUserName(data.first_name || '')
            setIsLoggedin(true)
            // setTimeout(() => {
            //     navigator('/dashboard');
            // }, 3000);
        },
        onError: (error) => {
            setRequestError(error.response.data.message)
        },
        onSettled: () => { setIsSubmitting(false) }
    })

    const reSetPasswordQuery = useMutation({
        mutationFn: ReSetPassword
    });
    const forgotPasswordQuery = useMutation({
        mutationFn: ForgotPassword

    });
    const passWordReSetCode = useMutation({
        mutationFn: PasswordReSetCode

    });

    const handleChange = (event) => {
        event.preventDefault();
        setFormData({ ...formData, [event.target.name]: event.target.value });
        (event.target.name in requestError) ? (
            delete requestError[event.target.name]
        ) : null
    }

    return (<>
        <div className="login-page">
            <div className="login-form">
                {
                    isSubmitting ? <CircularProgress /> : <img src={Logo} alt="Darajat logo" />
                }
                <h2>
                    {
                        isLoggedin ? <>Welcome {userName}</> : <> Login to Darajaat</>
                    }
                </h2>
                <form autoComplete="off" onSubmit={(event) => {
                    event.preventDefault();
                    loginQuery.mutate(formData)
                }}>
                    <div className="email-field">
                        <div className="email-seperator">
                            <MdOutlineMail className="email-icon" />
                            <input type="email" name='email' placeholder="Email" onChange={handleChange} />
                        </div>
                        <div>
                            <ErrorComponent error={'email'} Errors={requestError} />
                        </div>
                    </div>
                    <div className="password-field">
                        <div className="password-seperator">
                            <MdOutlinePassword className="password-icon" />
                            <input type="password" name='password' placeholder="Password" onChange={handleChange} />
                        </div>
                        <div>
                            <ErrorComponent error={'password'} Errors={requestError} />
                        </div>
                    </div>
                    <p>
                        <span>Forgot your password ?</span>
                        <span>Click here to reset it</span>
                    </p>
                    <button type="submit">Login</button>
                </form>
                <p>
                    No account ? no problem ! {" "}
                    <Link to='/signup'>
                        Click here to create one
                    </Link>
                </p>
            </div>
        </div>
    </>);
}