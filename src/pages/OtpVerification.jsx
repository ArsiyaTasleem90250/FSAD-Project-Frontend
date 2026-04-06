import { useState } from "react";
import { resendOtp } from "../api/api.js";

function OtpVerification({ email, onVerify, isLoading, error, setError }) {
  const [otp, setOtp] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [resendLoading, setResendLoading] = useState(false);

  const handleVerify = () => {
    onVerify(otp);
  };

  const handleResend = async () => {
    try {
      setResendLoading(true);
      setError("");
      const response = await resendOtp(email);
      
      if (response && response.message) {
        setResendMessage("OTP resent successfully! Check your email.");
        setOtp("");
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Error resending OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="otp-verification">
      <h2>Verify Email</h2>
      <p className="auth-desc">
        We've sent a 6-digit OTP to <strong>{email}</strong>
      </p>

      <div className="form-group">
        <label htmlFor="otp-input">Enter OTP</label>
        <input
          id="otp-input"
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 6);
            setOtp(value);
            setError("");
          }}
          maxLength="6"
          autoComplete="off"
          style={{ fontSize: "20px", letterSpacing: "10px", textAlign: "center" }}
        />
      </div>

      {error && <p className="error-message" style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
      {resendMessage && <p className="success-message" style={{ color: "green", marginBottom: "10px" }}>{resendMessage}</p>}

      <button
        onClick={handleVerify}
        className="button-primary"
        disabled={isLoading || otp.length !== 6}
        style={{ marginBottom: "10px" }}
      >
        {isLoading ? "Verifying..." : "Verify OTP"}
      </button>

      <p style={{ textAlign: "center", marginTop: "15px" }}>
        Didn't receive the code?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={resendLoading}
          style={{
            background: "none",
            border: "none",
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: "14px"
          }}
        >
          {resendLoading ? "Sending..." : "Resend OTP"}
        </button>
      </p>
    </div>
  );
}

export default OtpVerification;
