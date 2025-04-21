import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
 // Optional: for auth context
import './AdminLogin.css';
import Navbar from './Navbar';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [lockTime, setLockTime] = useState(0);
    const navigate = useNavigate();

    // Check for existing session on component mount
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            navigate('/AdminDashboard');
        }
    }, [navigate]);

    // Handle account lockout
    useEffect(() => {
        if (attempts >= 3) {
            setIsLocked(true);
            setLockTime(30); // 30 seconds lockout
            const timer = setInterval(() => {
                setLockTime(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsLocked(false);
                        setAttempts(0);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [attempts]);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (isLocked) {
            setError(`Account locked. Try again in ${lockTime} seconds.`);
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Replace with actual authentication logic
            if (username === 'admin' && password === 'admin123') {
                // On successful login
                localStorage.setItem('adminToken', 'dummy-token'); // Store token
                navigate('/AdminDashboard');
            } else {
                setAttempts(prev => prev + 1);
                throw new Error('Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin(e);
        }
    };

    return (
        <div className="admin-login-container">
            <Navbar></Navbar>
            <div className="admin-login-card">
                <div className="login-header">
                    <h1 className="admin-login-title">Admin Portal</h1>
                    <div className="logo-placeholder">
                        {/* Replace with your logo */}
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="#007BFF" strokeWidth="2"/>
                            <path d="M12 16V16.01M12 8V12" stroke="#007BFF" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>
                </div>
                
                <form onSubmit={handleLogin} className="admin-login-form">
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter admin username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                            required
                            autoFocus
                            className={error ? 'error' : ''}
                            disabled={isLoading || isLocked}
                        />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            required
                            className={error ? 'error' : ''}
                            disabled={isLoading || isLocked}
                        />
                    </div>
                    
                    {error && (
                        <div className="error-message">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {error}
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        className="admin-login-button"
                        disabled={isLoading || isLocked}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading-spinner"></span>
                                <span>Authenticating...</span>
                            </>
                        ) : isLocked ? (
                            `Locked (${lockTime}s)`
                        ) : (
                            'Login'
                        )}
                    </button>

                    <div className="login-footer-links">
                        <button type="button" className="forgot-password-link">
                            Forgot Password?
                        </button>
                    </div>
                </form>
                
                <div className="admin-login-footer">
                    <p>For authorized personnel only</p>
                    <p className="version-info">v1.0.0</p>
                    {process.env.NODE_ENV === 'development' && (
                        <p className="hint">Hint: admin / admin123</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;