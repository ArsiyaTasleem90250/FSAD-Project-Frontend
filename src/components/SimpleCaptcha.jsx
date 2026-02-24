import { useState, useEffect, useCallback } from "react";

const ALPHANUMERIC = "abcdefghijklmnopqrstuvwxyz0123456789";

function generateCode() {
  let s = "";
  for (let i = 0; i < 6; i++) {
    s += ALPHANUMERIC[Math.floor(Math.random() * ALPHANUMERIC.length)];
  }
  return s;
}

export default function SimpleCaptcha({ onCodeChange, value, onChange, inputId, "aria-label": ariaLabel }) {
  const [code, setCode] = useState(() => generateCode());

  const refresh = useCallback(() => {
    const newCode = generateCode();
    setCode(newCode);
    onCodeChange?.(newCode);
  }, [onCodeChange]);

  useEffect(() => {
    onCodeChange?.(code);
  }, [code, onCodeChange]);

  return (
    <div className="simple-captcha">
      <div className="simple-captcha__row">
        <span className="simple-captcha__code" aria-hidden="true">
          {code}
        </span>
        <button type="button" className="simple-captcha__refresh" onClick={refresh} title="Get new code">
          Refresh
        </button>
      </div>
      <label htmlFor={inputId} className="simple-captcha__label">
        Enter the code above
      </label>
      <input
        id={inputId}
        type="text"
        className="simple-captcha__input"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder="Type the code here"
        autoComplete="off"
        aria-label={ariaLabel || "Enter the captcha code shown above"}
      />
    </div>
  );
}
