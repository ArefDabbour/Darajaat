import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { LuDot } from "react-icons/lu";
import Logo from "../assets/logo.png"
import { useLocation, useNavigate, } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import { VscError } from "react-icons/vsc";
import { PasswordReSetCode } from '../Queries/PasswordReSetCode';
import { ReSetPassword as RSP } from '../Queries/ReSetPassword';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ErrorComponent from "../components/ErrorComponent";
import { LoginQuery } from '../Queries/LoginQuery';
import './ReSetPassword.css';


export default function ReSetPassword() {
    const [recivedEmail, setRecivedEmail] = useState('');
    const navigator = useNavigate();
    const location = useLocation();
    useEffect(() => {
        setRecivedEmail(location.state.email)
    }, [location.state.email])

    const [otp, setOtp] = useState('');
    const [otpBorderColor, setBorderColor] = useState("")

    const [isVerifying, setIsVerifying] = useState(false);
    const [verifyMessage, setVerifyMessage] = useState(true)

    const [wrongCode, setWrongCode] = useState(false);
    const [showPasswordField, setShowPasswordField] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [formData, setFormData] = useState({});
    const [submitError, setSubmittionError] = useState({});

    const [isResetting, setIsReSetting] = useState(false);
    const [newPassword, setNewPassword] = useState('')

    const verify = useMutation({
        mutationFn: PasswordReSetCode,
        onMutate: () => { setIsVerifying(true) },
        onSuccess: () => {
            setBorderColor('green');
            setVerifyMessage(false)
            setTimeout(() => {
                setShowPasswordField(true)
            }, 1000);
        },
        onError: (error) => {
            setWrongCode(true)
            setBorderColor('red');
            console.log(error)
        },
        onSettled: () => {
            setIsVerifying(false)
        }
    });
    const handleOtpChange = (otpValue) => {
        setOtp(otpValue);
        setBorderColor('');
        setWrongCode(false);
        setIsVerifying(false)
        if (otpValue.length === 6) {
            setIsVerifying(true)
            verify.mutate({ code: otpValue })
        }
    }

    const login = useMutation({
        mutationFn: LoginQuery,
        onSuccess: (data) => {
            localStorage.setItem('authToken', data.token)
            setTimeout(
                navigator('/dashboard'), 1000
            )
        },
        onError: (error) => {
            console.log('Error while logging in', error)
        }
    })
    const reset = useMutation({
        mutationFn: RSP,
        onMutate: () => setIsReSetting(true),
        onSuccess: () => {
            login.mutate({
                email: recivedEmail,
                password: newPassword
            })
        },
        onError: (error) => {
            setSubmittionError(error.response.data.message);
            console.log(error)
        },
        onSettled: () => setIsReSetting(false),
    });

    const handleInputChange = (event) => {
        event.preventDefault();
        setFormData({ ...formData, [event.target.name]: event.target.value, code: otp });
        (event.target.name in submitError) ? (
            delete submitError[event.target.name]
        ) : null
        if (event.target.name === 'password') {
            setNewPassword(event.target.value)
        }
    }
    return (<>
        <div className="reset-password">
            {
                (isResetting) ? <CircularProgress />
                    : <img src={Logo} alt="Darajat logo" />
            }
            {
                (isVerifying) ? (
                    <>
                        <h3>
                            <CircularProgress />
                            {"  "}
                            Verifying ...
                        </h3>
                    </>
                ) : (
                    <h3>
                        {
                            (wrongCode) ? (<>
                                <span className='wrong-code-entry'>
                                    <VscError />
                                    {"  "}
                                    Please enter the correct code
                                </span></>) : (
                                <>
                                    {
                                        verifyMessage ? (
                                            <>
                                                Please enter the code that we sent you on your email
                                            </>
                                        ) : (
                                            <>
                                                Enter the New Password and Confirm it
                                            </>
                                        )
                                    }
                                </>
                            )
                        }
                    </h3>
                )
            }
            {
                (showPasswordField) ?
                    <>
                        <form autoComplete='false' onSubmit={(event) => {
                            event.preventDefault();
                            reset.mutate({ formdata: formData })
                        }}>
                            <div className="password-field">

                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="password"
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                />
                                {passwordVisible ? (
                                    <FaEye
                                        onClick={() => {
                                            setPasswordVisible(false);
                                        }}
                                    />
                                ) : (
                                    <FaEyeSlash
                                        onClick={() => {
                                            setPasswordVisible(true);
                                        }}
                                    />
                                )}
                            </div>
                            <ErrorComponent error={'password'} Errors={submitError} />
                            <div className="password-field">
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="password_confirmation"
                                    onChange={handleInputChange}
                                    placeholder="confirm password here"
                                />
                                {passwordVisible ? (
                                    <FaEye
                                        onClick={() => {
                                            setPasswordVisible(false);
                                        }}
                                    />
                                ) : (
                                    <FaEyeSlash
                                        onClick={() => {
                                            setPasswordVisible(true);
                                        }}
                                    />
                                )}
                            </div>
                            <ErrorComponent error={'password_confirmation'} Errors={submitError} />
                            <button disabled={isResetting}>Reset password</button>
                        </form>
                    </>
                    : (
                        <OtpInput
                            value={otp}
                            onChange={
                                handleOtpChange
                            }
                            numInputs={6}
                            renderSeparator={<span className='spacing-dots'><LuDot /></span>}
                            renderInput={(props) => <input {...props} />}
                            placeholder='//////'
                            inputStyle={
                                {
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: "10px",
                                    borderColor: otpBorderColor,
                                    borderWidth: "4px"
                                }
                            }
                            inputType='tel'
                        />)
            }
        </div >
    </>);
}