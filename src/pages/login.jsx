import React, { useState } from "react"; // Import React and useState hook
import { logIn } from "../firebase"; // Import the logIn function from the firebase module

const Login = () => {
    // Creating state for email, password, and error messages
    const [email, setEmail] = useState(''); // Initialize email state
    const [password, setPassword] = useState(''); // Initialize password state
    const [error, setError] = useState(''); // Initialize error state

    // Handling form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setError(''); // Clear any previous error messages
        try {
            await logIn(email, password); // Call logIn with the entered email and password
        } catch (err) {
            setError(err.message); // Set error message if login fails
        }
    };

    return (
        <div className="login-container"> {/* Main container for the login form */}
            <div className="panel"> {/* Left panel for logo and tagline */}
                <div className="logo-container"> {/* Container for logo and tagline */}
                    <h2 className="logo">cRam</h2> {/* Logo */}
                    <h3 className="tagline">Your Tagline Here</h3> {/* Tagline below the logo */}
                </div>
            </div>
            <div className="login-elements"> {/* Right side for login form */}
                <div id="login-header">
                    Login
                </div>
                <div id="login-subhead">
                    Enter your credentials to log in.
                </div>
                {error && <div className="error-message">{error}</div>} {/* Show error message if exists */}
                <form onSubmit={handleLogin}> {/* Form that triggers handleLogin on submission */}
                    <input 
                        type="email" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state on change
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state on change
                        required
                    />
                    <button type="submit">Log me in!</button> {/* Submit button for the form */}
                </form>
                <div className="foot-login">
                    2024 cRam
                </div>
            </div>
        </div>
    );
};

export default Login; // Export the Login component for use in other parts of the application
