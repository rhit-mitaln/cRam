import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createUser } from "../../firebase";
import "./signup.css";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // State for password confirmation
  });
  const [error, setError] = useState("");

  const handleNextStep = () => {
    setError("");
    if (validateStep()) setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setError("");
    setStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateStep = () => {
    const { name, email, password, confirmPassword } = formData;
    if (step === 1 && !name) {
      setError("Please enter your name.");
      return false;
    }
    if (step === 2 && !email.includes("@")) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (step === 3 && password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (step === 3 && password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (validateStep()) {
      try {
        await createUser(formData.email, formData.password, {
          name: formData.name,
        });
        alert("Signup successful!");
      } catch (err) {
        console.error(err);
        setError("Failed to create an account. Please try again.");
      }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } },
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="logo">
          <h1>cRam</h1>
        </div>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              className="step-content"
              key="step1"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h2 className="step-title">Welcome to cRam!</h2>
              <p className="step-description" id="first-txt">Before we start cRamming, let's get to know you better.</p>
              <p className="step-description">Let's start by knowing what we should call you.</p>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="input-field"
              />
              {error && <div className="error-message">{error}</div>}
              <div className="step-actions">
                <button onClick={handleNextStep} className="next-btn">
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              className="step-content"
              key="step2"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h2 className="step-title">Hi {formData.name}!</h2>
              <p className="step-description">We are so happy to have you here!</p>
              <p className="step-description">Let's get your email so we can communicate with you.</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="input-field"
              />
              {error && <div className="error-message">{error}</div>}
              <div className="step-actions">
                <button onClick={handlePreviousStep} className="prev-btn">
                  Back
                </button>
                <button onClick={handleNextStep} className="next-btn">
                  Next
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              className="step-content"
              key="step3"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <h2 className="step-title">Secure your account</h2>
              <p className="step-description">Let's make sure it is only YOU who can access your account.</p>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="input-field"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Re-enter your password"
                className="input-field"
              />
              {error && <div className="error-message">{error}</div>}
              <div className="step-actions">
                <button onClick={handlePreviousStep} className="prev-btn">
                  Back
                </button>
                <button onClick={handleSignup} className="submit-btn">
                  Sign Up
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="footer">
          Already have an account? <a href="/login" id="signup">Log in</a> instead
        </div>
      </div>
      {/* Small grey text at the bottom */}
      <div className="bottom-text">2024 cRam</div>
    </div>
  );
};

export default Signup;
