import { Link } from "react-router";

export default function Login() {
    return (<>
        <div className="Login">
            <div className="loginForm">
                <h2>Login to Learn</h2>
                <h3> wlecome user please login to continue</h3>
                <input type="email" />
            </div>
            <Link to="/signup">
                <p>have no account ? click here to Sign up</p>
            </Link>
        </div>
    </>);
}