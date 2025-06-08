import { useEffect, useState } from 'react';
import './OTP.css'
import OtpInput from 'react-otp-input';
import { LuDot } from "react-icons/lu";
import Logo from "../assets/logo.png"
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { VerifyOtp } from '../Queries/VerifyOtp';
import { ReSendCode } from '../Queries/ReSendCode';
import CircularProgress from '@mui/material/CircularProgress';
import { SiTicktick } from "react-icons/si";
import { VscError } from "react-icons/vsc";

export default function OTP() {
    const location = useLocation();
    const navigator = useNavigate();

    const [recivedEmail, setRecivedEmail] = useState('');

    const [otp, setOtp] = useState('');
    const [otpBorderColor, setBorderColor] = useState("")

    const [isSending, setIsSending] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verifyMessage, setVerifyMessage] = useState(true)

    const [wrongCode, setWrongCode] = useState(false);
    const [isAllowedToReSendCode, setIsAllowedToReSendCode] = useState(true);
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        setRecivedEmail(location.state.email || '')
    }, [location.state])
    useEffect(() => {
        let timer = counter;
        if (timer > 0) {
            timer = setInterval(() => {
                setCounter(counter - 1)
            }, 1000)
        }
        else {
            setIsAllowedToReSendCode(true)
        }
        return () => { clearInterval(timer) }
    }, [counter])
    const verify = useMutation({
        mutationFn: VerifyOtp,
        onMutate: () => { setIsVerifying(true) },
        onSuccess: (data) => {
            setBorderColor('green');
            setVerifyMessage(false)
            localStorage.setItem('authToken', data.token)
            setTimeout(() => {
                navigator('/dashboard');
            }, 1000);
        },
        onError: () => {
            setWrongCode(true)
            setBorderColor('red');
        },
        onSettled: () => {
            setIsVerifying(false)
        }
    });
    const resendCode = useMutation({
        mutationFn: ReSendCode,
        onMutate: () => {
            setIsSending(true)
        },
        onSuccess: (response) => {
            console.log(response)
            setIsAllowedToReSendCode(false)
            setCounter(60)
        }
        ,
        onError: (error) => console.log(error),
        onSettled: () => setIsSending(false)
    })
    const handelChange = (otpValue) => {
        setOtp(otpValue);
        setBorderColor('');
        setWrongCode(false);
        setIsVerifying(false)
        if (otpValue.length === 6) {
            setIsVerifying(true)
            verify.mutate({ email: recivedEmail, otp_code: otpValue })
        }
    }
    return (<>
        <div className="otp">
            <div className="main-field">
                <img src={Logo} alt="Darajat logo" />
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
                                                    Please Enter the code that we sent you on your email
                                                </>
                                            ) : (
                                                <>
                                                    <SiTicktick />
                                                    {"  "}
                                                    Verification was done sucessfully
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }
                        </h3>
                    )
                }
                <OtpInput
                    value={otp}
                    onChange={
                        handelChange
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
                />
                <button
                    className='resend-code'
                    disabled={isSending || !isAllowedToReSendCode}
                    onClick={() => { resendCode.mutate({ email: recivedEmail }) }}
                >
                    {
                        (isSending) ? (
                            <>
                                Sending...
                            </>
                        ) : (
                            (isAllowedToReSendCode) ?
                                <>Resend code</> :
                                <>{counter}</>
                        )
                    }
                </button>
            </div>
        </div >
    </>);
}