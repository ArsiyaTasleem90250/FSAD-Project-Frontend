import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { useAuth } from "../context/AuthContext";
import { DEPARTMENTS } from "../constants/departments";
import SimpleCaptcha from "../components/SimpleCaptcha";
import "../assets/styles/auth.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState("Student");
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const captchaCodeRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setCaptchaError("");
    const code = captchaCodeRef.current || captchaCode;
    const valid = (captchaInput || "").trim().toLowerCase() === (code || "").toLowerCase();
    if (!valid) {
      setCaptchaError("Invalid code. Please enter the code shown above.");
      return;
    }
    const form = e.target;
    const email = form.querySelector("#login-email")?.value ?? "";
    const name = email.split("@")[0] || "User";
    const dept = form.querySelector("#login-department")?.value ?? department;
    login(role, email, name, dept);
    if (role === "Student") {
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
            <div className="form-group">
              <label htmlFor="login-role">Login as</label>
              <select
                id="login-role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Student">Student</option>
                <option value="Admin">Admin (Faculty)</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="login-department">Department</label>
              <select
                id="login-department"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
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
