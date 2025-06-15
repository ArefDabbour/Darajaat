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
import ErrorComponent from "../components/ErrorComponent";
import axios from "axios";

export default function Login() {
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userName, setUserName] = useState('');
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [requestError, setRequestError] = useState({});
    const [isEmailEntered, setIsEmailEntered] = useState(false);
    const [showErrorUi, setShowErrorUi] = useState(false);
    const navigator = useNavigate();

    const loginQuery = useMutation({
        mutationFn: LoginQuery,
        onMutate: () => { setIsSubmitting(true) },
        onSuccess: (data) => {
            setUserName(data.first_name || '')
            setIsLoggedin(true)
            setTimeout(() => {
                navigator('/dashboard');
            }, 3000);
        },
        onError: (error) => {
            setRequestError(error.response.data.message)
        },
        onSettled: () => { setIsSubmitting(false) }
    })

    const forgotPasswordQuery = useMutation({
        mutationFn: ForgotPassword,
        onMutate: () => { setIsSubmitting(true); setRequestError({}) },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                setRequestError(error.response.data.message)
            }
            else {
                console.log(error)
            }
        },
        onSuccess: (data) => {
            console.log(data)
            setTimeout(() => {
                navigator('/login/password-reset', {
                    state: {
                        email: formData.email
                    }
                });
            }, 2000);
        },
        onSettled: () => { setIsSubmitting(false); }
    });

    const handleChange = (event) => {
        event.preventDefault();
        setFormData({ ...formData, [event.target.name]: event.target.value });
        if (event.target.name === 'email') {
            if (event.target.value === '') {
                setIsEmailEntered(false)
            }
            else {
                setShowErrorUi(false)
                setIsEmailEntered(true)
            }
        }
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
                            <input
                                type="email"
                                name='email'
                                placeholder={
                                    (showErrorUi) ? 'Please enter your email' : "email"
                                }
                                onChange={handleChange}
                                style={{
                                    borderColor: (showErrorUi) ? "red" : ''
                                }} />
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
                    <div className="buttons">
                        <button
                            type="button"
                            className="reset-password-button"
                            onClick={() => {
                                (isEmailEntered) ? (
                                    forgotPasswordQuery.mutate(
                                        {
                                            email: formData.email
                                        }
                                    )
                                ) : setShowErrorUi(true)
                            }}
                        >{(isSubmitting) ? <>redirecting...</> : <>reset password</>}</button>
                        <button type="submit">Login</button>
                    </div>
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