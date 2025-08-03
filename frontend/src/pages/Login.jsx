import React, { useState } from 'react'
import { useAuth } from '../AuthContext'
import { api } from '../axios'
import '../styles/Login.css'

export default function Login() {
    const { login } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!name.trim() || !email.trim() || !password.trim()) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await api.post("login/", { name, email, password });
            console.log("Login response:", res.data);
            setSuccess("Login successful! Redirecting...");
            login(res.data.access, res.data.refresh);
            
            // Small delay to show success message
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        } catch (e) {
            setError("Invalid credentials. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleInputChange = (field, value) => {
        setError(""); // Clear error when user starts typing
        switch(field) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Sign in to your account</p>
                </div>

                {error && (
                    <div className="error-message">
                        <span>⚠️</span>
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        <span>✅</span>
                        {success}
                    </div>
                )}

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Full Name</label>
                        <input 
                            type="text" 
                            id="name"
                            name="name" 
                            value={name} 
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={`form-input ${error && !name.trim() ? 'error' : ''}`}
                            placeholder="Enter your full name"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email" 
                            value={email} 
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`form-input ${error && !email.trim() ? 'error' : ''}`}
                            placeholder="Enter your email"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password"
                            name="password" 
                            value={password} 
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className={`form-input ${error && !password.trim() ? 'error' : ''}`}
                            placeholder="Enter your password"
                            disabled={isLoading}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="login-button"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading-spinner"></span>
                                Signing In...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
