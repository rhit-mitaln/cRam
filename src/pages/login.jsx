import React, { useState } from "react"; 
import { Eye, EyeOff } from 'lucide-react';
import { logIn } from "../firebase"; 
import "./login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setEmailError(false);
    setPasswordError(false); // Reset error states
  
    try {
        await logIn(email, password);
        console.log('Login successful!'); // Log success for now
    } catch (err) {
        console.error("Firebase Error:", err); // Log the entire error object

        // Check the error message or code to provide specific feedback
        if (err.code === 'auth/user-not-found') {
            setEmailError(true);
            setError("No user found with this email.");
        } else if (err.code === 'auth/wrong-password') {
            setPasswordError(true);
            setError("Incorrect password.");
        } else {
            setError("An error occurred. Please try again."); // General error message
        }
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
                    if (emailError) setEmailError(false); // Reset error when typing
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
                    if (passwordError) setPasswordError(false); // Reset error when typing
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
    </div>
  );
};

export default Login;