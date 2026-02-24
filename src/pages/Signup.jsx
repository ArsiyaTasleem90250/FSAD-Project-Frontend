import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { useAuth } from "../context/AuthContext";
import { useRegistrations } from "../context/RegistrationsContext";
import { DEPARTMENTS } from "../constants/departments";
import SimpleCaptcha from "../components/SimpleCaptcha";
import "../assets/styles/auth.css";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { registerUser } = useRegistrations();
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
    const name = form.querySelector("#signup-name")?.value ?? "";
    const email = form.querySelector("#signup-email")?.value ?? "";
    const dept = form.querySelector("#signup-department")?.value ?? department;
    registerUser(email, role, dept);
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
          <h2>Sign up</h2>
          <p className="auth-desc">Create an account to access the platform.</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="signup-name">Full name</label>
              <input
                id="signup-name"
                type="text"
                placeholder="Enter your full name"
                required
                autoComplete="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                placeholder="At least 8 characters"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-confirm">Confirm password</label>
              <input
                id="signup-confirm"
                type="password"
                placeholder="Re-enter your password"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-role">Register as</label>
              <select
                id="signup-role"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Student">Student</option>
                <option value="Admin">Admin (Faculty)</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="signup-department">Department</label>
              <select
                id="signup-department"
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
                inputId="signup-captcha"
              />
              {captchaError && <p className="captcha-error">{captchaError}</p>}
            </div>
            <button type="submit" className="button-primary">
              Create account
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default Signup;
