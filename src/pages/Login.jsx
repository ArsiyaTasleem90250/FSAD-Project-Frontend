import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { useAuth } from "../context/AuthContext";
import { useRegistrations } from "../context/RegistrationsContext";
import SimpleCaptcha from "../components/SimpleCaptcha";
import "../assets/styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { registrations } = useRegistrations();
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [loginError, setLoginError] = useState("");
  const captchaCodeRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setCaptchaError("");
    setLoginError("");
    const code = captchaCodeRef.current || captchaCode;
    const valid = (captchaInput || "").trim().toLowerCase() === (code || "").toLowerCase();
    if (!valid) {
      setCaptchaError("Invalid code. Please enter the code shown above.");
      return;
    }

    const form = e.target;
    const email = (form.querySelector("#login-email")?.value ?? "").trim().toLowerCase();
    const name = email.split("@")[0] || "User";
    const registeredUser = registrations.find((r) => r.email.toLowerCase() === email);

    if (!registeredUser) {
      setLoginError("No account found for this email. Please sign up first.");
      return;
    }

    login(registeredUser.role, email, name, registeredUser.department);
    if (registeredUser.role === "Student") {
      navigate("/add-submission");
    } else {
      navigate("/marking");
    }
  };

  const handleCaptchaCodeChange = (newCode) => {
    captchaCodeRef.current = newCode;
    setCaptchaCode(newCode);
  };

  return (
    <MainLayout>
      <div className="auth-container">
        <div className="auth-box">
          <h2>Login</h2>
          <p className="auth-desc">Sign in with your email and password.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <div className="form-group-header">
                <label htmlFor="login-password">Password</label>
                <Link to="/" className="auth-forgot">Forgot password?</Link>
              </div>
              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>
            {loginError && <p className="captcha-error">{loginError}</p>}
            <div className="form-group form-group--captcha">
              <SimpleCaptcha
                onCodeChange={handleCaptchaCodeChange}
                value={captchaInput}
                onChange={setCaptchaInput}
                inputId="login-captcha"
              />
              {captchaError && <p className="captcha-error">{captchaError}</p>}
            </div>
            <button type="submit" className="button-primary">
              Login
            </button>
          </form>

          <p className="auth-switch">
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default Login;
