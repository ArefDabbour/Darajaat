import Select from "react-select";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./SignUp.css";
import { Alert } from "@mui/material";
import Logo from "../assets/logo.png"
import CircularProgress from '@mui/material/CircularProgress';
export default function SignUp() {
    const [languages, setlanguages] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedLanguageId, setselectedLanguageId] = useState("");
    const [selectedCountryId, setselectedCountryId] = useState("");
    const [formData, setFormData] = useState({});
    const [failedSubmitResponseMessage, setFailedSubmitResponseMessage] =
        useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigator = useNavigate();
    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/languages");
                setlanguages(response.data.data);
            } catch (error) {
                console.error("Error fetching languages:", error);
            }
        };
        fetchLanguages();
    }, []);
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/countries");
                setCountries(response.data.data);
            } catch (error) {
                console.error("Error fetching countries:", error);
            }
        };
        fetchCountries();
    }, []);
    const handelSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);
        axios
            .post("http://127.0.0.1:8000/api/users/register", formData)
            .then(function (response) {
                console.log(response)
                localStorage.setItem('authToken', response.data.data.token)
                if (response.status) {
                    navigator({
                        pathname: '/signup/otp',
                        state: { email: formData.email }
                    })
                }
            })
            .catch(function (error) {
                setFailedSubmitResponseMessage(error.response.data.message);
            }).finally(() => { setIsLoading(false) })
    };
    const handleChange = (event) => {
        event.preventDefault();
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    return (
        <>
            <div className="signUpPage">
                {isLoading && <CircularProgress />}
                <img src={Logo} alt="Darajat logo" />
                <h2>SignUp to Darajat</h2>
                <form onSubmit={handelSubmit} autoComplete="off">
                    <div className="name">
                        <div className="fullName">
                            <div className="first-name">
                                <input
                                    type="text"
                                    name="first_name"
                                    onChange={handleChange}
                                    placeholder="first name"
                                />
                            </div>
                            <div className="last-name">
                                <input
                                    type="text"
                                    name="last_name"
                                    onChange={handleChange}
                                    placeholder="last name"
                                />
                            </div>
                        </div>
                        {
                            ("first_name" in failedSubmitResponseMessage) || ("last_name" in failedSubmitResponseMessage) ? < Alert severity="error">
                                {
                                    failedSubmitResponseMessage.first_name && (
                                        <ul>
                                            {failedSubmitResponseMessage.first_name.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                            {failedSubmitResponseMessage.last_name.map((error, index) => (
                                                <li key={index} >{error}</li>
                                            ))}
                                        </ul>
                                    )
                                }
                            </Alert> : null
                        }
                    </div>
                    <div className="email">
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        {
                            ("email" in failedSubmitResponseMessage) ? < Alert severity="error">
                                {
                                    failedSubmitResponseMessage.email && (
                                        <ul>
                                            {failedSubmitResponseMessage.email.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    )
                                }
                            </Alert> : null
                        }
                    </div>
                    <div className="password-field">
                        <div className="password-entry">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                onChange={handleChange}
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
                        {
                            ("password" in failedSubmitResponseMessage) ? < Alert severity="error">
                                {
                                    failedSubmitResponseMessage.password && (
                                        <ul>
                                            {failedSubmitResponseMessage.password.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    )
                                }
                            </Alert> : null
                        }
                    </div>
                    <div className="password-conf-field">
                        <div className="password-conf-entry">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                name="password_confirmation"
                                onChange={handleChange}
                                placeholder="Confirm your password "
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
                        {
                            ("password_confirmation" in failedSubmitResponseMessage) ? < Alert severity="error">
                                {
                                    failedSubmitResponseMessage.password_confirmation && (
                                        <ul>
                                            {failedSubmitResponseMessage.password_confirmation.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    )
                                }
                            </Alert> : null
                        }
                    </div>
                    <div className="country-select-field">
                        <Select
                            className="country-select"
                            placeholder="Country"
                            classNamePrefix="select"
                            name="country_id"
                            onChange={(selectedOption) => {
                                setselectedCountryId(selectedOption?.value || null);
                                setFormData((prev) => ({
                                    ...prev,
                                    country_id: selectedOption?.value || null,
                                }));
                            }}
                            value={
                                countries.find((country) => country.id === selectedCountryId)
                                    ? {
                                        label: countries.find(
                                            (country) => country.id === selectedCountryId
                                        ).name,
                                        value: selectedCountryId,
                                    }
                                    : null
                            }
                            options={countries.map((country) => ({
                                label: country.name,
                                value: country.id,
                            }))}

                        />
                        {
                            ("country_id" in failedSubmitResponseMessage) ? < Alert severity="error">
                                {
                                    failedSubmitResponseMessage.country_id && (
                                        <ul>
                                            {failedSubmitResponseMessage.country_id.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    )
                                }
                            </Alert> : null
                        }
                    </div>
                    <div className="language-select-field">
                        <Select
                            className="language-select"
                            placeholder="Language"
                            classNamePrefix="select"
                            name="language_id"
                            onChange={(selectedOption) => {
                                setselectedLanguageId(selectedOption?.value || null);
                                setFormData((prev) => ({
                                    ...prev,
                                    language_id: selectedOption?.value || null,
                                }));
                            }}
                            value={
                                languages.find((lang) => lang.id === selectedLanguageId)
                                    ? {
                                        label: languages.find(
                                            (lang) => lang.id === selectedLanguageId
                                        ).name,
                                        value: selectedLanguageId,
                                    }
                                    : null
                            }
                            options={languages.map((language) => ({
                                label: language.name,
                                value: language.id,
                            }))}
                        />
                        {
                            ("language_id" in failedSubmitResponseMessage) ? < Alert severity="error">
                                {
                                    failedSubmitResponseMessage.language_id && (
                                        <ul>
                                            {failedSubmitResponseMessage.language_id.map((error, index) => (
                                                <li key={index}>{error}</li>
                                            ))}
                                        </ul>
                                    )
                                }
                            </Alert> : null
                        }
                    </div>
                    <button type="submit">
                        {isLoading ? "Processing..." : "Sign up now"}
                    </button>
                    <p>
                        <span className="already-have-an-account">
                            Already have an account ?{" "}
                        </span>
                        <span className="click-here-to-login">
                            <Link to="/login">
                                Click here to login
                            </Link>
                        </span>
                    </p>
                </form >
            </div >
        </>
    );
}
