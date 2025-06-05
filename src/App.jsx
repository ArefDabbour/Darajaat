import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import OTP from "./pages/OTP";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/otp" element={<OTP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
