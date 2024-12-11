import React, { useState } from "react"; 
import { Eye, EyeOff } from 'lucide-react';
import { logIn } from "../../firebase"; 
import "./login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // State for password confirmation
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setEmailError(false);
    setPasswordError(false); // Reset all error states

    try {
        await logIn(email, password);
        console.log('Login successful!');
        navigate('/dashboard');
    } catch (err) {
        console.error("Login Error:", err); // Debug log for the error object
        setEmailError(true);
        setPasswordError(true);
        setError("Your email/password is incorrect. Please recheck your credentials and try again.");
    }
};

  return (
    <div className="login-page">
      {/* Left Panel */}
      <div className="left-panel">
        <div id="cramMobile">
            <h2>cRam</h2>
            <p>Cram your college needs in one place</p>
        </div>
        <div className="branding">
          <h1>Login</h1>
          <p>Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <div className="boxTitle">
              <label htmlFor="email">Email address</label>
            </div>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false); // Reset border color when typing
                setPasswordError(false); // Ensure both fields reset borders
              }}
              className={emailError ? 'error-border' : ''} // Apply error class if there's an error
              required
            />
          </div>
          <div className="input-group password-input">
            <div className="boxTitle" id="passwordLabel"> 
              <label htmlFor="password">Password</label>
              <a href="#" id="forgot">forgot password</a>
            </div>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setEmailError(false); // Ensure both fields reset borders
                  setPasswordError(false); // Reset border color when typing
                }}
                className={passwordError ? 'error-border' : ''} // Apply error class if there's an error
                required
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={20} outline="#0066ff" className="password-icon" />
                ) : (
                  <Eye size={20} outline="#0066ff" className="password-icon"/>
                )}
              </button>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="form-actions">
            <button type="submit" className="login-btn">Log me in!</button>
          </div>
        </form>
        <div className="footer">
          Don't have an account? <a href="/signup" id="signup">Sign up</a>
        </div>
      </div>
      
      {/* Right Panel */}
      <div className="right-panel">
        <div className="illustration">
          <h2>cRam</h2>
          <p>Cram your college needs in one place</p>
          {/* Add an image or illustration here */}
        </div>
      </div>

      {/* Small grey text at the bottom */}
      <div className="bottom-text">2024 cRam</div>
    </div>
  );
};

export default Login;