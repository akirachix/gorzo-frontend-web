import React, { useState } from "react";
import { useSignIn } from "../hooks/useAuth";
import InputField from "./components/InputField/index";


import "./index.css";



export default function SignIn() {
  const { phone, setPhone, pin, setPin, error, handleLogin } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin();
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-container">
      <div className="box">
        <form onSubmit={handleSubmit}>
          <h1>WELCOME</h1>
          <h1>LOGIN</h1>
          <InputField
            label="Phone Number"
            placeholder="Enter your phone number"
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          
          <div className="input-with-toggle">
            <InputField
              label="PIN"
              placeholder="Enter your PIN"
              type={showPassword ? "text" : "password"}
              name="pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <button
              type="button"
              className="signin-password-toggle"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={toggleShowPassword}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#222"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <ellipse
                  cx="12"
                  cy="12"
                  rx="8"
                  ry="5"
                  stroke={showPassword ? "#d09900ff" : "#222"}
                />
                <circle cx="12" cy="12" r="2" />
                <line
                  x1="4"
                  y1="4"
                  x2="20"
                  y2="20"
                  style={{ display: showPassword ? "none" : "block" }}
                />
              </svg>
            </button>
          </div>
          
          {error && <p style={{ color: "red", margin: "10px 0" }}>{error}</p>}
        
          <button className="signin-login-btn" type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

