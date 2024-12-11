import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import './SignUp.css';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password' || name === 'confirmPassword') {
      const passwordError =
        name === 'password' && value.length < 6
          ? 'Password must be at least 6 characters'
          : '';
      const confirmPasswordError =
        name === 'confirmPassword' && value !== formData.password
          ? 'Passwords do not match'
          : '';

      setErrors({
        ...errors,
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const validateStep = () => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        break;
      case 2:
        if (!formData.email.includes('@'))
          newErrors.email = 'Invalid email address';
        break;
      case 3:
        if (formData.password.length < 6)
          newErrors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword)
          newErrors.confirmPassword = 'Passwords do not match';
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handlePrevious = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      // Check if email already exists
      const signInMethods = await fetchSignInMethodsForEmail(auth, formData.email);
      if (signInMethods.length > 0) {
        setErrors({ email: 'Email address is already in use. Please log in instead.' });
        setStep(2); // Redirect to email input page to show error
        return;
      }

      // Register the user
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      setSuccess(true);
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ form: 'An error occurred during registration. Please try again.' });
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="logo">
          <h1>cRam</h1>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {success ? (
              <div className="success-message">
                <h2>Registration Successful!</h2>
                <p>You can now log in to your account.</p>
                <a href="/login" className="login-btn">
                  Go to Login
                </a>
              </div>
            ) : (
              <>
                {step === 1 && (
                  <div className="step-content">
                    <h2 className="step-title">Welcome to cRam!</h2>
                    <p className="step-description">
                      Let's start by knowing what we should call you.
                    </p>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="input-field"
                    />
                    {errors.name && (
                      <div className="error-message">{errors.name}</div>
                    )}
                  </div>
                )}
                {step === 2 && (
                  <div className="step-content">
                    <h2 className="step-title">Hi {formData.name}!</h2>
                    <p className="step-description">
                      Let's get your email so we can communicate with you.
                    </p>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="input-field"
                    />
                    {errors.email && (
                      <div className="error-message">{errors.email}</div>
                    )}
                  </div>
                )}
                {step === 3 && (
                  <div className="step-content">
                    <h2 className="step-title">Secure your account</h2>
                    <p className="step-description">
                      Let's make sure it is only YOU who can access your account.
                    </p>
                    <div className="password-wrapper">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        className="input-field"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && (
                      <div className="error-message">{errors.password}</div>
                    )}
                    <p className="step-description">
                      Let's make sure you entered your password correctly.
                    </p>
                    <div className="password-wrapper">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Re-enter your password"
                        className="input-field"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <div className="error-message">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="step-actions">
          {!success && (
            <>
              {step > 1 && (
                <button onClick={handlePrevious} className="prev-btn">
                  Back
                </button>
              )}
              {step < 3 ? (
                <button onClick={handleNext} className="next-btn">
                  Next
                </button>
              ) : (
                <button onClick={handleSubmit} className="submit-btn">
                  Sign Up
                </button>
              )}
            </>
          )}
        </div>
        <div className="footer">
          Already have an account? <a href="/login">Log in</a> instead.
        </div>
      </div>
      <div className="bottom-text">2024 cRam</div>
    </div>
  );
};

export default SignUp;
