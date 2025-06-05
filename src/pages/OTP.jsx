import { useState } from 'react';
import './OTP.css'
import OtpInput from 'react-otp-input';
import { LuDot } from "react-icons/lu";
import Logo from "../assets/logo.png"
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { VerifyOtp } from '../Queries/VerifyOtp';
import { ReSendCode } from '../Queries/ReSendCode';
import CircularProgress from '@mui/material/CircularProgress';
import { TiTick } from "react-icons/ti";

export default function OTP() {
    const location = useLocation();
    const navigator = useNavigate();
    const recivedEmail = location.state?.email;

    const [otp, setOtp] = useState('');
    const [otpBorderColor, setBorderColor] = useState("")

    const [isSending, setIsSending] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verifyMessage, setVerifyMessage] = useState('Verifying')
    const verify = useMutation({
        mutationFn: VerifyOtp,
        onMutate: () => { setIsVerifying(true) },
        onSuccess: (data) => {
            setBorderColor('green');
            localStorage.setItem('authToken', data.token)
            setVerifyMessage(<TiTick />)
            setTimeout(() => {
                navigator('/dashboard');
            }, 1000);
        },
        onError: () => {
            setBorderColor('red');
        },
        onSettled: () => {
            setIsVerifying(false)
        }
    });
    const resendCode = useMutation({
        mutationFn: ReSendCode,
        onMutate: () => setIsSending(true),
        onSettled: () => setIsSending(false)
    })
    const handelChange = (otpValue) => {
        setOtp(otpValue);
        setBorderColor('');
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
                            <CircularProgress />
                            <h3>
                                {verifyMessage}
                            </h3>
                        </>
                    ) :
                        < h3 >
                            Please enter the code that we sent you on your email
                        </h3>
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
                    disabled={isSending}
                    onClick={() => { resendCode.mutate() }}
                >
                    {
                        (isSending) ? (
                            <>
                                <CircularProgress />
                                Sending ...
                            </>
                        ) : 'Resend code'
                    }
                </button>
            </div>
        </div >
    </>);
}